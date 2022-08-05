import React from "react";
import { Provider } from "react-redux";
import * as monaco from "monaco-editor";
import { loader } from "@monaco-editor/react";

loader.config({ monaco });
loader.init().then((_instance) => {});

import App from "./App";
import { injectHotReload, render } from "./renderer";
import { store } from "./store/store";

import "./index.css";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

injectHotReload();
