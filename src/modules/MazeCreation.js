import React, { useRef, useState, useEffect } from "react";
import { RadioButton, Badge, FileUploader, Input, Button } from "@ui5/webcomponents-react";
import "./MazeCreation.css";
import Maze from "./Maze";

/**
 * Renders the element for maze creation
 * @param {{board: Array.<Array.<Number>>, setBoard: Function, scale: Number}} props
 * @returns React element for maze creation
 */
function MazeCreation(props) {
  const widthInput = useRef(),
    heightInput = useRef();

  const [width, setWidth] = useState(props.board[0].length);
  const [height, setHeight] = useState(props.board.length);
  const [mode, setMode] = useState(1);
  const [entranceCheck, setEntranceCheck] = useState(0);
  const [exitCheck, setExitCheck] = useState(0);
  const [outsideWallsCheck, setOutsideWallsCheck] = useState(1);

  /**
   * Handles changes in canvas size
   */
  const handleChangeSize = () => {
    const newWidth = Number(widthInput.current.value);
    const newHeight = Number(heightInput.current.value);
    let newBoard = props.board;
    if (!Number.isInteger(newWidth) || !Number.isInteger(newHeight) || newWidth <= 1 || newHeight <= 1) {
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

  /**
   * Changes type of element if the board is clicked
   * @param {Number} row
   * @param {Number} column
   */
  const handleClickElement = (row, column) => {
    if (props.board[row][column] === mode) return;
    let newBoard = [];
    for (const rowElement of props.board) newBoard.push([...rowElement]);
    newBoard[row][column] = mode;
    props.setBoard(newBoard);
  };

  /**
   * Check function wether outside wall is continuous
   */
  const checkOutsideWall = () => {
    let hole = false;
    for (let element of props.board[0]) if (element === 1) hole = true;
    for (let element of props.board[props.board.length - 1]) if (element === 1) hole = true;
    for (let row of props.board) {
      if (row[0] === 1) hole = true;
      if (row[row.length - 1] === 1) hole = true;
    }
    setOutsideWallsCheck(hole ? 0 : 1);
  };

  /**
   * Checks wether entrance/exit is on outside wall and that there is only one of them
   * @param {Number} type
   */
  const checkEntranceExit = (type) => {
    let outputMode;
    let eCount = 0;
    let ePos;
    for (const [y, row] of props.board.entries()) {
      for (const [x, element] of row.entries()) {
        if (element === type) {
          eCount++;
          ePos = { x, y };
        }
      }
    }
    outputMode = eCount === 0 ? 0 : eCount > 1 ? 2 : 1;
    if (outputMode === 1) {
      if (ePos.y !== 0 && ePos.x !== 0 && ePos.y !== height - 1 && ePos.x !== width - 1) {
        outputMode = 3;
      }
    }
    if (outputMode === 1) {
      if (ePos.x === 0) {
        outputMode = props.board[ePos.y][1] === 1 ? 1 : 4;
      } else if (ePos.x === width - 1) {
        outputMode = props.board[ePos.y][width - 2] === 1 ? 1 : 4;
      } else {
        if (ePos.y === 0) {
          outputMode = props.board[1][ePos.x] === 1 ? 1 : 4;
        } else {
          outputMode = props.board[height - 2][ePos.x] === 1 ? 1 : 4;
        }
      }
    }
    if (type === 2) setEntranceCheck(outputMode);
    if (type === 3) setExitCheck(outputMode);
  };

  /**
   * Handles uploads from JSON
   * @param {HTMLElement} e
   * @returns
   */
  const handleUpload = (e) => {
    let file = e.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = (evt) => {
      let importedObj = JSON.parse(String(evt.target.result));
      if (!Array.isArray(importedObj)) return;
      if (!Array.isArray(importedObj[0])) return;
      setHeight(importedObj.length);
      setWidth(importedObj[0].length);
      props.setBoard(importedObj);
    };
    reader.readAsText(file);
  };

  /**
   * Downloads current game state as JSON
   */
  const handleDownload = () => {
    let a = document.createElement("a");
    let file = new Blob([JSON.stringify(props.board, null, 2)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = `Maze.json`;
    a.click();
  };

  /**
   * Runs checks every time the board is changed
   */
  useEffect(() => {
    checkOutsideWall();
    checkEntranceExit(2);
    checkEntranceExit(3);
  }, [props.board]);

  /**
   * Resets board on first render
   */
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
      <div className="maze">
        Width:
        <Input type="Number" ref={widthInput} value={width} className="menu-bar number-input"></Input>
        Height:
        <Input type="Number" ref={heightInput} value={height} className="menu-bar number-input"></Input>
        <Button onClick={handleChangeSize} className="menu-bar">
          Change Size
        </Button>
        <Button onClick={handleDownload} className="menu-bar">
          Download Maze Settings
        </Button>
        <FileUploader className="menu-bar" onInput={handleUpload} accept=".json" hideInput>
          <Button>Upload Maze Settings</Button>
        </FileUploader>
      </div>
      <div className="maze">
        <Maze data={props.board} stroked={true} onClick={(row, column) => handleClickElement(row, column)} scale={props.scale} />
      </div>
      <div>
        <RadioButton onChange={() => setMode(0)} name="ModeSelector" checked={mode === 0} text="Wall" />
        <RadioButton onChange={() => setMode(1)} name="ModeSelector" checked={mode === 1} text="Path" />
        <RadioButton onChange={() => setMode(2)} name="ModeSelector" checked={mode === 2} text="Entrance" />
        <RadioButton onChange={() => setMode(3)} name="ModeSelector" checked={mode === 3} text="Exit" />
      </div>
      <div>
        {entranceCheck === 0 && (
          <Badge className="error-badges" colorScheme="2">
            No entrance found!
          </Badge>
        )}
        {entranceCheck === 1 && (
          <Badge className="error-badges" colorScheme="7">
            Entrance available
          </Badge>
        )}
        {entranceCheck === 2 && (
          <Badge className="error-badges" colorScheme="1">
            Too many entrances!
          </Badge>
        )}
        {entranceCheck === 3 && (
          <Badge className="error-badges" colorScheme="1">
            Entrance not on outside wall!
          </Badge>
        )}
        {entranceCheck === 4 && (
          <Badge className="error-badges" colorScheme="1">
            No path connected to entrance!
          </Badge>
        )}
        {exitCheck === 0 && (
          <Badge className="error-badges" colorScheme="2">
            No exit found!
          </Badge>
        )}
        {exitCheck === 1 && (
          <Badge className="error-badges" colorScheme="7">
            Exit available
          </Badge>
        )}
        {exitCheck === 2 && (
          <Badge className="error-badges" colorScheme="1">
            Too many exits!
          </Badge>
        )}
        {exitCheck === 3 && (
          <Badge className="error-badges" colorScheme="1">
            Exit not on outside wall!
          </Badge>
        )}
        {exitCheck === 4 && (
          <Badge className="error-badges" colorScheme="1">
            No path connected to exit!
          </Badge>
        )}
        {outsideWallsCheck === 0 && (
          <Badge className="error-badges" colorScheme="2">
            No continuous outside wall
          </Badge>
        )}
        {outsideWallsCheck === 1 && (
          <Badge className="error-badges" colorScheme="7">
            Outside wall continuous
          </Badge>
        )}
      </div>
    </>
  );
}

export default MazeCreation;
