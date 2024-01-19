import { React, useState } from "react";
import Maze from "./Maze";

function MazeSolveManual(props) {
  const [focusPoint, setFocusPoint] = useState(() => {
    let row, column;
    for (const [rowIndex, rowElement] of props.board.entries()) {
      for (const [columnIndex, element] of rowElement.entries()) {
        if (element === 2) {
          row = rowIndex;
          column = columnIndex;
        }
      }
    }
    console.log(row);
    console.log(column);
    return { row, column };
  });

  const handleClickElement = (row, column) => {};

  return (
    <>
      <Maze data={props.board} stroked={false} onClick={(row, column) => handleClickElement(row, column)} focusPoint={focusPoint} />
    </>
  );
}

export default MazeSolveManual;
