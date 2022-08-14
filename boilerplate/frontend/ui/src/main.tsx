import React from "react";
import { render } from "react-xul";

import App from "./App";

import "./index.css";

render(<App />, document.getElementById("root") as HTMLElement);

let gMgr = Cc["@mozilla.org/memory-reporter-manager;1"].getService(
  Ci.nsIMemoryReporterManager
);

// Minimize memory usage once a minute. This might need to be removed in the
// future if it causes performance issues.
setInterval(() => {
  gMgr.minimizeMemoryUsage(() => {});
}, 1000 * 60);
