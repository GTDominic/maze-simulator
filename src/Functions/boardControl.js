class BoardControl {
  static clickHandler(board, oldFocusPoint, travelledPath, row, column) {
    let frow = oldFocusPoint.row;
    let fcolumn = oldFocusPoint.column;
    let path = [];
    let focusPoint = {};
    let finish = board[row][column] === 3;
    board = this.copyBoard(board);
    travelledPath = this.copyTravelledPath(travelledPath);
    if (board[row][column] === 0) return null;
    if (frow === row && fcolumn === column) return null;
    if (frow !== row && fcolumn !== column) return null;
    if (frow === row) {
      for (
        let i = fcolumn;
        column > fcolumn ? i <= column : i >= column;
        column > fcolumn ? i++ : i--
      ) {
        path.push({ row, column: i });
      }
    } else {
      for (
        let i = frow;
        row > frow ? i <= row : i >= row;
        row > frow ? i++ : i--
      ) {
        path.push({ row: i, column });
      }
    }
    for (let element of path) {
      if (board[element.row][element.column] === 0) return;
    }
    if (board[row][column] === 4) {
      if (path.length > travelledPath.length + 1) return;
      for (let i = 1; i < path.length; i++) {
        if (
          path[i].row !== travelledPath[travelledPath.length - i].row ||
          path[i].column !== travelledPath[travelledPath.length - i].column
        )
          return;
      }
      for (let i = 0; i < path.length - 1; i++) {
        travelledPath.pop();
        board[path[i].row][path[i].column] = 1;
      }
    } else {
      if (board[path[1].row][path[1].column] === 4) {
        let corner = null;
        for (let i = 1; i < path.length - 1; i++) {
          if (board[path[i].row][path[i].column] === 4) {
            if (board[path[i + 1].row][path[i + 1].column] === 1) {
              if (corner !== null) return;
              corner = i;
            }
          }
        }
        for(let i = 1; i < path.length; i++) {
          if (i <= corner) {
            travelledPath.pop();
            board[path[i - 1].row][path[i - 1].column] = 1;
          } else {
            travelledPath.push({ row: path[i - 1].row, column: path[i - 1].column });
            board[path[i].row][path[i].column] = 4;
          }
        }
      } else {
        for (let i = 2; i < path.length - 1; i++) {
          if (board[path[i].row][path[i].column] === 4) return;
        }
        for (let i = 1; i < path.length; i++) {
          board[path[i].row][path[i].column] = 4;
          travelledPath.push({ row: path[i - 1].row, column: path[i - 1].column });
        }
      }
    }
    focusPoint = { row, column };
    if (finish) alert("Finished!");
    return { board, focusPoint, travelledPath };
  }
  static copyBoard(board) {
    let newBoard = [];
    for (let row of board) {
      newBoard.push([...row]);
    }
    return newBoard;
  }
  static copyTravelledPath(travelledPath) {
    let newPath = [];
    for (let point of travelledPath) {
      newPath.push({ row: point.row, column: point.column });
    }
    return newPath;
  }
}

export default BoardControl;
