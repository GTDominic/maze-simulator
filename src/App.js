import React, { useState } from "react";
import "./App.css";

import { Input, RadioButton } from "@ui5/webcomponents-react";

import MazeCreation from "./modules/MazeCreation";
import MazeSolveManual from "./modules/MazeSolveManual";

function App() {
  const [board, setBoard] = useState([
    [0, 0],
    [0, 0],
  ]);
  const [mode, setMode] = useState(0);
  const [scale, setScale] = useState(20);

  const handleScaleChange = (e) => {
    const val = Number(e.target.value);
    if (!Number.isInteger(val) || val < 1) {
      e.target.value = scale;
    };
    setScale(e.target.value);
  }

  return (
    <div className="app">
      <section className="app-content">
        <div className="menu-band">
          <div>
            <RadioButton onChange={() => setMode(0)} name="SetMode" checked={mode === 0} text="Maze Creation" />
            <RadioButton onChange={() => setMode(1)} name="SetMode" checked={mode === 1} text="Solve the Maze Manually" />
            <RadioButton onChange={() => setMode(2)} name="SetMode" checked={mode === 2} text="Algorithmically Solve the Maze" />
          </div>
          <div>
            Scale: 
            <Input type="Number" value={scale} onChange={handleScaleChange} />
          </div>
        </div>
        <div>
          {mode === 0 && <MazeCreation board={board} setBoard={setBoard} scale={scale} />}
          {mode === 1 && <MazeSolveManual board={board} setBoard={setBoard} scale={scale} />}
          {mode === 2 && <p>Test</p>}
        </div>
      </section>
    </div>
  );
}

export default App;
