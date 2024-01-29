import FollowRightWall from "./FollowRightWall";

function getAlgorithmLinks(board, setBoard, focusPoint, setFocusPoint, stats, setStats) {
  return [
    new FollowRightWall(board, setBoard, focusPoint, setFocusPoint, stats, setStats),
  ]
}

export default getAlgorithmLinks;
