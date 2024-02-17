/**
 * Base class for algorithms
 * 
 * be sure to implement these methods:
    void reset();
    void step();
 * 
 * you can access the following attributes:
    board: Array<Array<Number>>; 
    focusPoint: {row: Number, column: Number};
    stats: {boardChecks: Number,  boardValueChanges: Number}
 * 
 * Your constructor should look like this:
    constructor(board, setBoard, focusPoint, setFocusPoint, stats, setStats) {
        super(board, setBoard, focusPoint, setFocusPoint, stats, setStats);
        this.name = "";
        // Initialize your own variables here if needed.
      }
 */
class AlgorithmBase {
  board;
  setBoard;
  focusPoint;
  setFocusPoint;
  stats;
  setStats;
  name;

  /**
   * Initializes the object
   * @param {Array<Array<Number>>} board 
   * @param {Function} setBoard 
   * @param {{row: Number, column: Number}} focusPoint 
   * @param {Function} setFocusPoint 
   * @param {{steps: Number, boardChecks: Number,  boardValueChanges: Number}} stats 
   * @param {Function} setStats 
   */
  constructor(board, setBoard, focusPoint, setFocusPoint, stats, setStats) {
    this.board = board;
    this.setBoard = setBoard;
    this.focusPoint = focusPoint;
    this.setFocusPoint = setFocusPoint;
    this.stats = stats;
    this.setStats = setStats;
  }

  /**
   * Resets the class
   * @param {Array<Array<Number>>} board 
   * @param {row: Number, column: Number} focusPoint 
   */
  resetBase(board, focusPoint) {
    this.board = board;
    this.focusPoint = focusPoint;
    this.stats = {
      steps: 0,
      boardChecks: 0,
      boardValueChanges: 0,
    }
    this.reset();
  }

  /**
   * Executes a step
   */
  stepBase() {
    if (this.board[this.focusPoint.row][this.focusPoint.column] === 3) return;
    this.stats.steps++;
    this.step();
    let nBoard = [];
    for (let row of this.board) {
      nBoard.push([...row]);
    }
    this.setBoard(nBoard);
    this.setFocusPoint(this.focusPoint);
    this.setStats(this.stats);
  }
}

export default AlgorithmBase;
