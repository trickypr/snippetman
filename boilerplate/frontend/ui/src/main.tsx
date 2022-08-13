import React from "react";
import { render, injectDevTools } from "react-xul";

import App from "./App";

import "./index.css";

render(<App />, document.getElementById("root") as HTMLElement);

injectDevTools();

// Open assorted debugging windows
Services.ww.openWindow(
  null,
  "about:memory",
  "_blank",
  [
    "dialog",
    "resizable",
    "minimizable",
    "centerscreen",
    "titlebar",
    "close",
  ].join(","),
  []
);
