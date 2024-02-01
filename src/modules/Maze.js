import React from "react";
import "./Maze.css";

/**
 * Generates a Maze from data
 *
 * @param {{data: Array.<Array.<Number>>, stroked: Boolean, onClick: Function, scale: Number, focusPoint: {row: Number, column: Number}}} props
 * @returns SVG Object for the maze
 */
function Maze(props) {
  const classes = ["boardWall", "boardPath", "boardEntrance", "boardExit", "boardPathTraveled", "boardPathFocus"];
  const scale = props.scale;
  let renderData = [];

  for (const [rowIndex, row] of props.data.entries()) {
    for (const [columnIndex, element] of row.entries()) {
      let className = classes[element];
      if (props.focusPoint) {
        if (props.focusPoint.row === rowIndex && props.focusPoint.column === columnIndex) {
          className = element === 2 ? classes[2] : classes[5];
        }
      }
      if (props.stroked) className += "Stroked";
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
