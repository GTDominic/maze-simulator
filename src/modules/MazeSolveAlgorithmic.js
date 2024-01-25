import React, { useState, useEffect } from "react";
import Maze from "./Maze";
import { Select, Option, Button, Switch, Input } from "@ui5/webcomponents-react";

import FollowRightWall from "../algorithms/FollowRightWall";

function MazeSolveAlgorithmic(props) {
  const algorithms = ["Follow Right Wall"];

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
  const [currentAlgorithm, setCurrentAlgorithm] = useState(algorithms[0]);
  const [runAI, setRunAI] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [followRightWall, setFollowRightWall] = useState(new FollowRightWall(props.board, props.setBoard, focusPoint, setFocusPoint));

  const step = () => {
    if (currentAlgorithm === algorithms[0]) followRightWall.step();
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

  return (
    <>
      <div>
        <Select
          onChange={(e) => {
            setCurrentAlgorithm(e.target.value);
          }}
        >
          {algorithms.map((v) => (
            <Option value={v} key={v}>
              {v}
            </Option>
          ))}
        </Select>
        <Button onClick={step}>Step Algorithm</Button>
        <Switch
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
    </>
  );
}

export default MazeSolveAlgorithmic;
