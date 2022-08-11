import React from "react";

import { Snippet } from "./sections/Snippet";
import { SnippetList } from "./sections/SnippetList";
import { Tree } from "./sections/Tree";

function App() {
  return (
    <hbox flex={1} style={{ width: "100%", height: "100vh" }}>
      <Tree />
      <splitter />
      <SnippetList />
      <splitter />
      <Snippet />
    </hbox>
  );
}

export default App;
