class AlgorithmBase {
  board;
  setBoard;
  focusPoint;
  setFocusPoint;
  stats;
  setStats;
  name;

  constructor(board, setBoard, focusPoint, setFocusPoint, stats, setStats) {
    this.board = board;
    this.setBoard = setBoard;
    this.focusPoint = focusPoint;
    this.setFocusPoint = setFocusPoint;
    this.stats = stats;
    this.setStats = setStats;
  }

  resetBase(board, focusPoint) {
    this.board = board;
    this.focusPoint = focusPoint;
    this.reset();
  }

  stepBase() {
    if (this.board[this.focusPoint.row][this.focusPoint.column] === 3) return;
    this.stats.steps++;
    this.step();
    this.setBoard(this.board);
    this.setFocusPoint(this.focusPoint);
    this.setStats(this.stats);
  }
}

export default AlgorithmBase;
