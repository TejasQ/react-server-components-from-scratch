import * as React from "react";
import { hydrateRoot } from "react-dom/client";

const baz = (k, v) => {
  if (v === "$RE") {
    return Symbol.for("react.element");
  }

  return v;
};

const root = hydrateRoot(
  document,
  // @ts-ignore
  JSON.parse(window.lol, baz)
);

const navigate = (to: string) => {
  window.history.pushState(null, null, to);
  fetch(`${to}&jsx`)
    .then((r) => r.text())
    .then((txt) => {
      root.render(JSON.parse(txt, baz));
    });
};

window.addEventListener(
  "click",
  (e: any) => {
    console.log(e);
    // Only listen to link clicks.
    if (e.target.tagName !== "A") {
      return;
    }

    console.log(e.target);

    // Prevent the browser from reloading the page but update the URL.
    e.preventDefault();
    // window.history.pushState(null, null, href);
    // Call our custom logic.
    navigate(e.target.href);
  },
  true
);

window.addEventListener("popstate", () => {
  // When the user presses Back/Forward, call our custom logic too.
  navigate(window.location.pathname);
});
