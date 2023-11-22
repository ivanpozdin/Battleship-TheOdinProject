export default class {
  #enemyGameBoard;
  #gameBoard;

  constructor(gameBoard, enemyGameBoard) {
    this.#gameBoard = gameBoard;
    this.#enemyGameBoard = enemyGameBoard;
    this.isAttacking = false;
  }

  attack(coords = null) {
    const { row, col } = coords || this.#randomEmptyCell;
    if (!this.#enemyGameBoard.receiveAttack(row, col)) return false;

    return { row, col };
  }

  get #randomEmptyCell() {
    const emptyCells = [];
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (!this.#enemyGameBoard.board[row][col]) {
          emptyCells.push([row, col]);
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * (emptyCells.length - 1));
    const [row, col] = emptyCells[randomIndex];
    return { row, col };
  }

  get board() {
    return this.#gameBoard.board;
  }

  get shipsPlacement() {
    return this.#gameBoard.shipsPlacement;
  }

  get allShipsSunk() {
    return this.#gameBoard.allShipsSunk;
  }

  reset() {
    this.#gameBoard.reset();
  }
}
