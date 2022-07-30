import React from "react";
import App from "./App";
import "./index.css";
import { render } from "./renderer";

render(<App />, document.getElementById("root") as HTMLElement);
