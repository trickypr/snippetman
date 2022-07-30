import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

const { XPCOMUtils } = ChromeUtils.importESModule(
  "resource://gre/modules/XPCOMUtils.sys.mjs"
);

let lazy = {};
XPCOMUtils.defineLazyModuleGetters(lazy, {
  DevtoolsServer: "resource:///modules/DevtoolsServer.jsm",
});

function App() {
  const [count, setCount] = useState(0);
  console.log(reactLogo);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src="chrome://snippetman/content/vite.svg"
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button
          onClick={() => {
            const devtools = new lazy.DevtoolsServer();
            devtools.start();
          }}
        >
          Open dev tools
        </button>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
