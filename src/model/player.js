export default class {
  #enemyGameBoard;
  #gameBoard;

  constructor(gameBoard, enemyGameBoard) {
    this.#gameBoard = gameBoard;
    this.#enemyGameBoard = enemyGameBoard;
    this.isAttacking = false;
  }

  attack(coords = null) {
    const { x, y } = coords || this.#randomEmptyCell;
    if (!this.#enemyGameBoard.receiveAttack(x, y)) return false;

    return { x, y };
  }

  get #randomEmptyCell() {
    const emptyCells = [];
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        if (!this.#enemyGameBoard.board[x][y]) {
          emptyCells.push([x, y]);
        }
      }
    }
    const randomIndex = Math.floor(Math.random() * (emptyCells.length - 1));
    const [x, y] = emptyCells[randomIndex];
    return { x, y };
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
}
