class FollowRightWall {
  board;
  setBoard;
  focusPoint;
  setFocusPoint;
  lastPosition;

  constructor(board, setBoard, focusPoint, setFocusPoint) {
    this.board = board;
    this.setBoard = setBoard;
    this.focusPoint = focusPoint;
    this.setFocusPoint = setFocusPoint;
  }

  reset(board, focusPoint) {
    this.board = board;
    this.focusPoint = focusPoint;
    this.lastPosition = null;
  }

  step() {
    if (this.board[this.focusPoint.row][this.focusPoint.column] === 3) return;
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
    } while (this.board[nrow][ncolumn] === 0);
    if (this.board[nrow][ncolumn] !== 3) {
      if (this.board[nrow][ncolumn] === 4) this.board[frow][fcolumn] = 1;
      else this.board[nrow][ncolumn] = 4;
    }
    this.lastPosition = { row: frow, column: fcolumn };
    this.focusPoint = { row: nrow, column: ncolumn };
    this.setBoard(this.board);
    this.setFocusPoint(this.focusPoint);
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
    this.focusPoint = { row: nrow, column: ncolumn };
    this.setBoard(this.board);
    this.setFocusPoint(this.focusPoint);
  }
}

export default FollowRightWall;
