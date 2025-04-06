import React from "react";
import { hydrate } from "react-dom";
import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  let rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("Root element not found! Creating one dynamically.");
    rootElement = document.createElement("div");
    rootElement.id = "root";
    document.body.appendChild(rootElement);
  }

  hydrate(<App />, rootElement);
});
