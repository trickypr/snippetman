import React from "react";

import "./App.css";
import { SnippetList } from "./components/SnippetList";
import { Tree } from "./components/Tree";

function App() {
  return (
    <>
      <Tree />
      <SnippetList />
    </>
  );
}

export default App;
