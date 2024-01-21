import { React, useState, useEffect } from "react";
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
    return { row, column };
  });

  const handleClickElement = (row, column) => {
    const oldRow = focusPoint.row;
    const oldColumn = focusPoint.column;
    if (oldRow !== row && oldColumn !== column) return;
    if (props.board[row][column] === 0) return;
    let path = [];
    if (row > oldRow) for (let i = oldRow; i <= row; i++) path.push({ row: i, column });
    if (row < oldRow) for (let i = oldRow; i >= row; i--) path.push({ row: i, column });
    if (column > oldColumn) for (let i = oldColumn; i <= column; i++) path.push({ row, column: i });
    if (column < oldColumn) for (let i = oldColumn; i >= column; i--) path.push({ row, column: i });
    for (const element of path) if (props.board[element.row][element.column] === 0) return;
    let newBoard = props.board;
    let exit = newBoard[row][column] === 3;
    if (newBoard[row][column] === 4 || newBoard[row][column] === 2) {
      for (const element of path) if (newBoard[element.row][element.column] === 4) newBoard[element.row][element.column] = 1;
      if (newBoard[row][column] === 1) newBoard[row][column] = 4;
    } else {
      if (newBoard[path[1].row][path[1].column] === 4) {
        for (let i = 0; i < path.length - 1; i++) {
          const element = path[i];
          const element2 = path[i + 1];
          newBoard[element.row][element.column] = newBoard[element.row][element.column] === 4 ? newBoard[element2.row][element2.column] === 1 ? 4 : 1 : 4;
        }
        const element = path[path.length - 1];
        newBoard[element.row][element.column] = 4;
      } else {
        for (const element of path) if (newBoard[element.row][element.column] === 1) newBoard[element.row][element.column] = 4;
      }
    }
    if (exit) {
      newBoard[row][column] = 3;
      alert("Solved the maze!");
    }
    setFocusPoint({ row, column });
    props.setBoard(newBoard);
  };

  useEffect(() => {
    let newBoard = props.board;
    for (const row of newBoard) {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 4) row[i] = 1;
      }
    }
    props.setBoard(newBoard);
  }, []);

  return (
    <>
      <Maze data={props.board} stroked={false} onClick={(row, column) => handleClickElement(row, column)} focusPoint={focusPoint} scale={props.scale} />
    </>
  );
}

export default MazeSolveManual;
