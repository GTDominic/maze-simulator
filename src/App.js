import React, { useState } from "react";
import "./App.css";

import "@ui5/webcomponents/dist/Panel";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/Button";

import MazeCreation from "./modules/MazeCreation";

function App() {
  const [board, setBoard] = useState([[0,0],[0,0]]);

  return (
    <div className="app">
      <section className="app-content">
        <div className="dropdown-wrapper">
          <ui5-panel header-text="Maze creation">
            <MazeCreation board={board} setBoard={setBoard} />
          </ui5-panel>
        </div>
        <div className="dropdown-wrapper">
          <ui5-panel header-text="Solve the Maze Manually" collapsed={true}>
            <p>Test</p>
          </ui5-panel>
        </div>
        <div className="dropdown-wrapper">
          <ui5-panel
            header-text="Algorithmically Solve the Maze"
            collapsed={true}
          >
            <p>Test</p>
          </ui5-panel>
        </div>
      </section>
    </div>
  );
}

export default App;
