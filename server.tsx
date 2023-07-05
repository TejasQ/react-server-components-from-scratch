import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import { join } from "path";

import Layout from "./layout";

const app = express();

app.use(express.static("./dist"));

app.get("/:page", async (req, res) => {
  const mod = await import(
    join(process.cwd(), "dist", "pages", req.params.page)
  );
  const Page = mod.default;
  const reactTree = await createReactTree(
    <Layout bgColor={req.params.page === "list" ? "white" : "black"}>
      <Page {...req.query} />
    </Layout>
  );

  if (req.query.jsx === "") {
    res.end(JSON.stringify(reactTree, escapeJsx));
    return;
  }

  const html = `${renderToString(reactTree)}
  <script>
  window.__initialMarkup=\`${JSON.stringify(reactTree, escapeJsx)}\`;
  </script>
  <script src="/client.js" type="module"></script>`;

  res.end(html);
});

const createReactTree = async (jsx) => {
  if (!jsx) {
    return;
  }

  if (["string", "boolean", "number"].includes(typeof jsx)) {
    return jsx;
  }

  if (Array.isArray(jsx)) {
    return await Promise.all(jsx.map(createReactTree));
  }

  if (typeof jsx === "object" && jsx !== null) {
    if (jsx.$$typeof === Symbol.for("react.element")) {
      if (typeof jsx.type === "string") {
        return { ...jsx, props: await createReactTree(jsx.props) };
      }

      if (typeof jsx.type === "function") {
        const Component = jsx.type;
        const props = jsx.props;
        const renderedComponent = await Component(props);
        return await createReactTree(renderedComponent);
      }
    }

    return Object.fromEntries(
      await Promise.all(
        Object.entries(jsx).map(async ([key, value]) => [
          key,
          await createReactTree(value),
        ])
      )
    );
  }
};

const escapeJsx = (key, value) => {
  if (value === Symbol.for("react.element")) {
    return "$";
  }
  return value;
};

app.listen(3000, () => {
  console.log("Listening on 3000!");
});
