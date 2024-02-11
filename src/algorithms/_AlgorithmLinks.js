import FollowRightWall from "./FollowRightWall";
import SimpleTree from "./SimpleTree";

/**
 * Links Created Algorithms.
 * 
 * To add your own algorithm add it to the returned object.
 * 
 * @param {Array<Array<Number>>} board 
 * @param {Function} setBoard 
 * @param {{row: Number, column: Number}} focusPoint 
 * @param {Function} setFocusPoint 
 * @param {{steps: Number, boardChecks: Number,  boardValueChanges: Number}} stats 
 * @param {Function} setStats 
 * @returns Array of algorithm objects
 */
function getAlgorithmLinks(board, setBoard, focusPoint, setFocusPoint, stats, setStats) {
  return [
    new FollowRightWall(board, setBoard, focusPoint, setFocusPoint, stats, setStats),
    new SimpleTree(board, setBoard, focusPoint, setFocusPoint, stats, setStats),
  ]
}

export default getAlgorithmLinks;
