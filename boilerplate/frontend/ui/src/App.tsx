import React from "react";

import { Snippet } from "./components/Snippet";
import { SnippetList } from "./components/SnippetList";
import { Tree } from "./components/Tree";

function App() {
  return (
    <>
      <Tree />
      <splitter />
      <SnippetList />
      <splitter />
      <Snippet />
    </>
  );
}

export default App;
