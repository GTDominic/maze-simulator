import React from "react";
import "./Maze.css";

function Maze(props) {
  const classes = ["boardWall", "boardPath", "boardEntrance", "boardExit", "boardPathTravelled", "boardPathFocus"];
  const scale = 20;
  let renderData = [];

  for (const [rowIndex, row] of props.data.entries()) {
    for (const [columnIndex, element] of row.entries()) {
      let className = classes[element];
      if (props.focusPoint) {
        if (props.focusPoint.row === rowIndex && props.focusPoint.column === columnIndex) {
          className = element === 2 ? classes[2] : classes[5];
        }
      }
      if (props.stroked) className += 'Stroked';
      renderData.push({ x: columnIndex * scale, y: rowIndex * scale, className, rowIndex, columnIndex });
    }
  }

  const rectangles = renderData.map((data) => (
    <rect
      x={data.x}
      y={data.y}
      width={scale}
      height={scale}
      className={data.className}
      key={`${data.rowIndex}|${data.columnIndex}`}
      onClick={() => {
        props.onClick(data.rowIndex, data.columnIndex);
      }}
    />
  ));

  return (
    <svg width={props.data[0].length * scale} height={props.data.length * scale}>
      {rectangles}
    </svg>
  );
}

export default Maze;
