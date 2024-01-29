import AlgorithmBase from "../modules/AlgorithmBase";

class FollowRightWall extends AlgorithmBase {
  lastPosition;

  constructor(board, setBoard, focusPoint, setFocusPoint, stats, setStats) {
    super(board, setBoard, focusPoint, setFocusPoint, stats, setStats);
    this.name = "Follow Right Wall";
    this.lastPosition = null;
  }

  reset() {
    this.lastPosition = null;
  }

  step() {
    if (!this.lastPosition) return this.firstStep();
    const xdif = this.focusPoint.column - this.lastPosition.column;
    const ydif = this.focusPoint.row - this.lastPosition.row;
    const frow = this.focusPoint.row;
    const fcolumn = this.focusPoint.column;
    let direction; // 0: up, 1: left, 2: down, 3: right
    let nrow, ncolumn;
    if (xdif === 0) {
      if (ydif === 1) direction = 0; // Last Move: down
      else direction = 2; // Last Move: up
    } else if (xdif === 1) direction = 1; // Last Move: right
    else direction = 3; // Last Move: left
    do {
      direction = (direction + 1) % 4;
      nrow = direction === 0 ? frow - 1 : direction === 2 ? frow + 1 : frow;
      ncolumn = direction === 1 ? fcolumn - 1 : direction === 3 ? fcolumn + 1 : fcolumn;
      this.stats.boardChecks++;
    } while (this.board[nrow][ncolumn] === 0);
    if (this.board[nrow][ncolumn] !== 3) {
      if (this.board[nrow][ncolumn] === 4) this.board[frow][fcolumn] = 1;
      else this.board[nrow][ncolumn] = 4;
    }
    this.stats.boardValueChanges++;
    this.lastPosition = { row: frow, column: fcolumn };
    this.focusPoint = { row: nrow, column: ncolumn };
  }

  firstStep() {
    const frow = this.focusPoint.row;
    const fcolumn = this.focusPoint.column;
    let nrow, ncolumn;
    if (frow === 0) {
      nrow = 1;
      ncolumn = fcolumn;
    }
    if (frow === this.board.length - 1) {
      nrow = frow - 1;
      ncolumn = fcolumn;
    }
    if (fcolumn === 0) {
      nrow = frow;
      ncolumn = 1;
    }
    if (fcolumn === this.board[0].length - 1) {
      nrow = frow;
      ncolumn = fcolumn - 1;
    }
    this.lastPosition = { row: frow, column: fcolumn };
    this.board[nrow][ncolumn] = 4;
    this.stats.boardValueChanges++;
    this.focusPoint = { row: nrow, column: ncolumn };
  }
}

export default FollowRightWall;
