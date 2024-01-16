import React, { useRef, useState, useEffect, useCallback } from "react";
import { RadioButton } from '@ui5/webcomponents-react';
import "./MazeCreation.css";
import Maze from "./Maze";

function MazeCreation(props) {
  const widthInput = useRef(),
    heightInput = useRef(),
    changeSize = useRef();

  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(2);
  const [mode, setMode] = useState(1);

  const handleChangeSize = () => {
    const newWidth = Number(widthInput.current.value);
    const newHeight = Number(heightInput.current.value);
    let newBoard = props.board;
    if (!Number.isInteger(newWidth) || !Number.isInteger(newHeight) || Number(newWidth) <= 1 || Number(newHeight) <= 1) {
      widthInput.current.value = width;
      heightInput.current.value = height;
      return;
    }
    if (newWidth === width && newHeight === height) return;
    if (newWidth < width) {
      for (let i = 0; i < newBoard.length; i++) {
        newBoard[i] = newBoard[i].slice(0, newWidth);
        newBoard[i][newBoard[i].length - 1] = 0;
      }
    } else if (newWidth > width) {
      const distance = newWidth - width;
      for (let row of newBoard) {
        for (let i = 0; i < distance; i++) row.push(0);
      }
    }
    if (newHeight < height) {
      newBoard = newBoard.slice(0, newHeight);
      for (let i = 0; i < newBoard[newBoard.length - 1].length; i++) newBoard[newBoard.length - 1][i] = 0;
    } else if (newHeight > height) {
      const distance = newHeight - height;
      let newRow = [];
      for (let i = 0; i < newWidth; i++) newRow.push(0);
      for (let i = 0; i < distance; i++) newBoard.push([...newRow]);
    }
    props.setBoard(newBoard);
    setHeight(newHeight);
    setWidth(newWidth);
  };

  const handleClickElement = (row, column) => {
    alert(`${row} ${column} ${mode}`);
  };

  useEffect(() => {
    changeSize.current.addEventListener("click", handleChangeSize);
    return () => {
      changeSize.current.removeEventListener("click", handleChangeSize);
    };
  }, [handleChangeSize]);

  return (
    <>
      <div>
        Width:
        <ui5-input type="Number" ref={widthInput} value={width} class="menu-bar number-input"></ui5-input>
        Height:
        <ui5-input type="Number" ref={heightInput} value={height} class="menu-bar number-input"></ui5-input>
        <ui5-button ref={changeSize} class="menu-bar">
          Change Size
        </ui5-button>
      </div>
      <Maze data={props.board} stroked={true} onClick={(row, column) => handleClickElement(row, column)} />
      <div>
        <RadioButton onChange={() => setMode(0)} name="ModeSelector" checked={mode === 0} text="Wall" />
        <RadioButton onChange={() => setMode(1)} name="ModeSelector" checked={mode === 1} text="Path" />
        <RadioButton onChange={() => setMode(2)} name="ModeSelector" checked={mode === 2} text="Entrance" />
        <RadioButton onChange={() => setMode(3)} name="ModeSelector" checked={mode === 3} text="Exit" />
      </div>
    </>
  );
}

export default MazeCreation;
