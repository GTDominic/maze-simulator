import React, { useState, useEffect } from "react";
import Maze from "./Maze";
import "./MazeSolveAlgorithmic.css";
import { Select, Option, Button, Switch, Input } from "@ui5/webcomponents-react";
import getAlgorithmLinks from "../algorithms/_AlgorithmLinks";

function MazeSolveAlgorithmic(props) {
  const [focusPoint, setFocusPoint] = useState(null);
  const [stats, setStats] = useState({
    steps: 0,
    boardChecks: 0,
    boardValueChanges: 0,
  });
  const [algorithms, setAlgorithms] = useState(getAlgorithmLinks(props.board, props.setBoard, focusPoint, setFocusPoint, stats, setStats));
  const [currentAlgorithm, setCurrentAlgorithm] = useState(0);
  const [runAI, setRunAI] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [disabledElements, setDisabledElements] = useState(false);

  const step = () => {
    if (!disabledElements) {
      setDisabledElements(true);
    }
    algorithms[currentAlgorithm].stepBase();
  };

  const reset = () => {
    setRunAI(false);
    setDisabledElements(false);
    // Reset Board
    let newBoard = props.board;
    for (const row of newBoard) {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 4) row[i] = 1;
      }
    }
    let row, column;
    // Reset Focus Point
    for (const [rowIndex, rowElement] of newBoard.entries()) {
      for (const [columnIndex, element] of rowElement.entries()) {
        if (element === 2) {
          row = rowIndex;
          column = columnIndex;
        }
      }
    }
    setFocusPoint({ row, column });
    props.setBoard(newBoard);
    // Reset Stats
    setStats({
      steps: 0,
      boardChecks: 0,
      boardValueChanges: 0,
    });
    // Reset Algorithms
    for (let algorithm of algorithms) {
      algorithm.resetBase(newBoard, { row, column });
    }
  };

  const handleSpeedChange = (e) => {
    const val = Number(e.target.value);
    if (!Number.isInteger(val) || val < 1) {
      e.target.value = speed;
    }
    setSpeed(e.target.value);
  };

  useEffect(() => {
    const autoRunInterval = setInterval(() => {
      if (runAI) step();
    }, speed);
    return () => {
      clearInterval(autoRunInterval);
    };
  }, [speed, runAI]);

  useEffect(() => {
    reset();
  }, []);

  return (
    <>
      <div className="alg-menu-bar">
        <Select
          className="menu-element"
          onChange={(e) => {
            setCurrentAlgorithm(e.target.value);
          }}
          disabled={disabledElements}
        >
          {algorithms.map((value, index) => (
            <Option value={index} key={index}>
              {value.name}
            </Option>
          ))}
        </Select>
        <Button className="menu-element" onClick={reset}>
          Reset
        </Button>
        <Button className="menu-element" onClick={step}>
          Step Algorithm
        </Button>
        <Switch
          className="switch"
          checked={runAI}
          onChange={() => {
            setRunAI(!runAI);
          }}
        />
        {runAI && <>Stop Algorithm</>}
        {!runAI && <>Run Algorithm</>}
        <Input className="menu-element alg-number-input" type="Number" onChange={handleSpeedChange} value={speed} />
        Algorithm Speed
      </div>
      <div className="maze">
        <Maze data={props.board} stroked={false} onClick={(row, column) => {}} focusPoint={focusPoint} scale={props.scale} />
      </div>
      <div className="menu-element">
        <p>Steps: {stats.steps}</p>
        <p>Board Checks: {stats.boardChecks}</p>
        <p>Board Value Changes: {stats.boardValueChanges}</p>
      </div>
    </>
  );
}

export default MazeSolveAlgorithmic;
