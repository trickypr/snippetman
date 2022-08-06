import React from "react";
import { Provider } from "react-redux";
import { render, injectDevTools } from "react-xul";

import App from "./App";
import { store } from "./store/store";

import "./index.css";

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") as HTMLElement
);

injectDevTools();
