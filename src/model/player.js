export default class {
  #enemyGameBoard;
  constructor(enemyGameBoard) {
    this.#enemyGameBoard = enemyGameBoard;
  }

  attack(coords = null) {
    const { x, y } = coords || this.#randomEmptyCell;

    this.#enemyGameBoard.receiveAttack(x, y);
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
}
