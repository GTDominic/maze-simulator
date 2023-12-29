import { React, useState } from "react";
import Board from "./Components/Board";
import BoardControl from "./Functions/boardControl.js";
const defaults = require("./defaults.json");

function App() {
  const [boardState, setBoardState] = useState(defaults.board);
  const [focusPoint, setFocusPoint] = useState(defaults.focusPoint);
  const [settings, setSettings] = useState(defaults.settings);
  const [travelledPath, setTravelledPath] = useState([]);
  
  const boardGameClickHandler = (row, column) => {
    const newVal = BoardControl.clickHandler(boardState, focusPoint, travelledPath, row, column);
    if (newVal) {
      setBoardState(newVal.board);
      setFocusPoint(newVal.focusPoint);
      setTravelledPath(newVal.travelledPath);
    }
  };

  return (
    <div className="App">
      <Board
        data={boardState}
        focusPoint={focusPoint}
        scale={settings.boardScale}
        onElementClick={boardGameClickHandler}
      />
    </div>
  );
}

export default App;
