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

  step() {
    if (this.board[this.focusPoint.row][this.focusPoint.column] === 3) return;
    if (!this.lastPosition) return this.firstStep();
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
    this.lastPosition = {row: frow, column: fcolumn};
    this.board[nrow][ncolumn] = 4;
    this.focusPoint = {row: nrow, column: ncolumn};
    this.setBoard(this.board);
    this.setFocusPoint(this.focusPoint);
  }
}

export default FollowRightWall;
