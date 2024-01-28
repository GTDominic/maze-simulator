import React, { useState, useEffect } from "react";
import Maze from "./Maze";
import { Select, Option, Button, Switch, Input } from "@ui5/webcomponents-react";

import FollowRightWall from "../algorithms/FollowRightWall";

function MazeSolveAlgorithmic(props) {
  const algorithms = ["Follow Right Wall"];

  const [focusPoint, setFocusPoint] = useState(null);
  const [currentAlgorithm, setCurrentAlgorithm] = useState(algorithms[0]);
  const [runAI, setRunAI] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [disabledElements, setDisabledElements] = useState(false);
  const [stats, setStats] = useState({
    steps: 0,
    boardChecks: 0,
    boardValueChanges: 0,
  });
  const [followRightWall, setFollowRightWall] = useState(new FollowRightWall(props.board, props.setBoard, focusPoint, setFocusPoint, stats, setStats));

  const step = () => {
    if (!disabledElements) {
      setDisabledElements(true);
    }
    if (currentAlgorithm === algorithms[0]) followRightWall.step();
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
    followRightWall.reset(newBoard, { row, column });
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

  // TODO: Style Menu Bar
  return (
    <>
      <div>
        <Select
          onChange={(e) => {
            setCurrentAlgorithm(e.target.value);
          }}
          disabled={disabledElements}
        >
          {algorithms.map((v) => (
            <Option value={v} key={v}>
              {v}
            </Option>
          ))}
        </Select>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={step}>Step Algorithm</Button>
        <Switch
          checked={runAI}
          onChange={() => {
            setRunAI(!runAI);
          }}
        />
        {runAI && <>Stop Algorithm</>}
        {!runAI && <>Run Algorithm</>}
        <Input type="Number" onChange={handleSpeedChange} value={speed} />
        Algorithm Speed
      </div>
      <div>
        <Maze data={props.board} stroked={false} onClick={(row, column) => {}} focusPoint={focusPoint} scale={props.scale} />
      </div>
      <div>
        <p>Steps: {stats.steps}</p>
        <p>Board Checks: {stats.boardChecks}</p>
        <p>Board Value Changes: {stats.boardValueChanges}</p>
      </div>
    </>
  );
}

export default MazeSolveAlgorithmic;
