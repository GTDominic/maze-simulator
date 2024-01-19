import React, { useState } from "react";
import "./App.css";

import { RadioButton } from "@ui5/webcomponents-react";

import MazeCreation from "./modules/MazeCreation";
import MazeSolveManual from "./modules/MazeSolveManual";

function App() {
  const [board, setBoard] = useState([
    [0, 0],
    [0, 0],
  ]);
  const [mode, setMode] = useState(0);

  return (
    <div className="app">
      <section className="app-content">
        <RadioButton onChange={() => setMode(0)} name="SetMode" checked={mode === 0} text="Maze Creation" />
        <RadioButton onChange={() => setMode(1)} name="SetMode" checked={mode === 1} text="Solve the Maze Manually" />
        <RadioButton onChange={() => setMode(2)} name="SetMode" checked={mode === 2} text="Algorithmically Solve the Maze" />
        <div>
          {mode === 0 && <MazeCreation board={board} setBoard={setBoard} />}
          {mode === 1 && <MazeSolveManual board={board} setBoard={setBoard} />}
          {mode === 2 && <p>Test</p>}
        </div>
      </section>
    </div>
  );
}

export default App;
