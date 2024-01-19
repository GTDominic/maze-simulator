import React, { useState } from "react";
import "./App.css";

import "@ui5/webcomponents/dist/Panel";

import MazeCreation from "./modules/MazeCreation";
import MazeSolveManual from "./modules/MazeSolveManual";

function App() {
  const [board, setBoard] = useState([
    [0, 0],
    [0, 0],
  ]);

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
            <MazeSolveManual board={board} setBoard={setBoard} />
          </ui5-panel>
        </div>
        <div className="dropdown-wrapper">
          <ui5-panel header-text="Algorithmically Solve the Maze" collapsed={true}>
            <p>Test</p>
          </ui5-panel>
        </div>
      </section>
    </div>
  );
}

export default App;
