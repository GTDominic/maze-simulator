import AlgorithmBase from "../modules/AlgorithmBase";

class SimpleTree extends AlgorithmBase {
  element;
  trace;
  exitPos;

  constructor(board, setBoard, focusPoint, setFocusPoint, stats, setStats) {
    super(board, setBoard, focusPoint, setFocusPoint, stats, setStats);
    this.name = "Simple Tree";
  }

  step() {
    if (this.trace) return this.tracing();
    let nx;
    let ny;
    for (let i = 0; i < 4; i++) {
      switch (i) {
        case 0:
          nx = this.element.x;
          ny = this.element.y - 1;
          break;
        case 1:
          nx = this.element.x + 1;
          ny = this.element.y;
          break;
        case 2:
          nx = this.element.x;
          ny = this.element.y + 1;
          break;
        case 3:
          nx = this.element.x - 1;
          ny = this.element.y;
          break;
      }
      this.stats.boardChecks++;
      if (this.board[ny][nx] === 3) {
        this.trace = true;
        for (let i = 0; i < this.board.length; i++) {
          for (let j = 0; j < this.board[i].length; j++) {
            this.stats.boardChecks++;
            if (this.board[i][j] === 4) {
              this.stats.boardValueChanges++;
              this.board[i][j] = 1;
            }
          }
        }
        this.exitPos = { row: ny, column: nx };
        return;
      }
      this.stats.boardChecks++;
      if (this.board[ny][nx] === 1) {
        let f = false;
        for (let e of this.element.next) {
          if (e.x === nx && e.y === ny) f = true;
        }
        if (f) continue;
        let l = this.element.next.push(new SimpleTreePath(this.element, nx, ny));
        this.element = this.element.next[l - 1];
        this.stats.boardValueChanges++;
        this.board[ny][nx] = 4;
        return;
      }
    }
    this.element = this.element.last;
  }

  tracing() {
    if (this.element.last === null) {
      this.focusPoint.row = this.exitPos.row;
      this.focusPoint.column = this.exitPos.column;
      return;
    }
    this.stats.boardValueChanges++;
    this.board[this.element.y][this.element.x] = 4;
    this.element = this.element.last;
  }

  reset() {
    this.element = new SimpleTreePath(null, this.focusPoint.column, this.focusPoint.row);
    this.trace = false;
  }
}

class SimpleTreePath {
  next;
  last;
  x;
  y;

  constructor(e, x, y) {
    this.last = e;
    this.x = x;
    this.y = y;
    this.next = [];
  }
}

export default SimpleTree;
