import { hydrateRoot } from "react-dom/client";

const revive = (k, v) => {
  if (v === "$") {
    return Symbol.for("react.element");
  }

  return v;
};

// @ts-ignore
const markup = JSON.parse(window.__initialMarkup, revive);

const root = hydrateRoot(document, markup);

const navigate = (to: string) => {
  fetch(`${to}&jsx`)
    .then((r) => r.text())
    .then((data) => {
      root.render(JSON.parse(data, revive));
    });
};

window.addEventListener("click", (e: any) => {
  console.log(e.target);
  if (e.target.tagName !== "A") return;

  e.preventDefault();
  window.history.pushState(null, null, e.target.href);
  navigate(e.target.href);
});
