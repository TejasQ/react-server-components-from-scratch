import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import App from "./App";
import { join } from "path";

const app = express();

app.use(express.static("./dist"));

const escape = (k, v) => {
  if (v === Symbol.for("react.element")) {
    return `$RE`;
  }
  if (v === Symbol.for("react.module.reference")) {
    return `$RMF`;
  }

  return v;
};

app.get("/:page", async (req, res) => {
  const page = await import(join(process.cwd(), "dist", req.params.page));
  const jsx = await turnJSXtoClientJSX(
    <App bg={req.params.page === "list" ? "red" : "green"}>
      {await page.default({ ...req.query })}
    </App>,
    req
  );

  if (req.query.jsx === "") {
    const payload = JSON.stringify(jsx, escape);
    res.end(payload);
    return;
  }

  const htmlTree = renderToString(jsx);
  res.setHeader("Content-Type", "text/html");
  res.end(
    htmlTree +
      `<script>window.lol = \`${JSON.stringify(jsx, escape).replace(
        /</g,
        "\\u003c"
      )}\`</script><script type="module" src="/client.js"></script>`
  );
});

const turnJSXtoClientJSX = async (jsx, req) => {
  if (!jsx) {
    return null;
  }
  if (["string", "number", "boolean"].includes(typeof jsx)) {
    return jsx;
  }
  if (Array.isArray(jsx)) {
    return Promise.all(jsx.map(turnJSXtoClientJSX));
  }
  if (typeof jsx === "object") {
    if (jsx["$$typeof"] === Symbol.for("react.module.reference")) {
      console.log("aefafa", jsx);
      return "lol";
    }
    if (jsx["$$typeof"] === Symbol.for("react.lazy")) {
    }
    if (jsx["$$typeof"] === Symbol.for("react.element")) {
      if (typeof jsx.type === "string") {
        return {
          ...jsx,
          props: await turnJSXtoClientJSX(jsx.props, req),
        };
      }

      if (typeof jsx.type === "function") {
        const Component = jsx.type;
        const props = jsx.props;

        if (Component.name.startsWith("Client")) {
          return null;
        }

        const renderedJsx = await Component({ ...props, ...req.query });
        return await turnJSXtoClientJSX(renderedJsx, req);
      }
    }

    return Object.fromEntries(
      await Promise.all(
        Object.entries(jsx).map(async ([prop, value]) => [
          prop,
          await turnJSXtoClientJSX(value, req),
        ])
      )
    );
  }
};

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
