import "./Board.css";
import React from "react";

function Board(props) {
  const scale = props.scale;
  let renderData = [];

  for (let row = 0; row < props.data.length; row++) {
    for (let column = 0; column < props.data[row].length; column++) {
      const element = props.data[row][column];
      let className = "";
      switch (element) {
        case 0:
          className = "boardWall";
          break;
        case 1:
          className = "boardPath";
          break;
        case 2:
          className = "boardEntrance";
          break;
        case 3:
          className = "boardExit";
          break;
        case 4:
          className = "boardPathTravelled";
          break;
        default:
          break;
      }
      if(props.focusPoint.row === row && props.focusPoint.column === column) {
        className = element === 2 ? "boardEntrance" : "boardPathFocus";
      }

      renderData.push({
        x: column * scale,
        y: row * scale,
        className,
        row,
        column,
      });
    }
  }

  const rectangles = renderData.map((data) => (
    <rect
      x={data.x}
      y={data.y}
      width={scale}
      height={scale}
      className={data.className}
      key={`${data.row}|${data.column}`}
      onClick={() => {props.onElementClick(data.row, data.column)}}
    />
  ));

  return <svg>{rectangles}</svg>;
}

export default Board;
