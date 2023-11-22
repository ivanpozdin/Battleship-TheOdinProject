import Ship from "./ship";
import cellState from "./cellState";

export default class GameBoard {
  #shipsPlacement = Array.from({ length: 10 }, (_) =>
    Array.from({ length: 10 }, (_, i) => null)
  );

  #ships = [
    new Ship(4),
    new Ship(3),
    new Ship(3),
    new Ship(2),
    new Ship(2),
    new Ship(2),
    new Ship(1),
    new Ship(1),
    new Ship(1),
    new Ship(1),
  ];

  #board = Array.from({ length: 10 }, (_) =>
    Array.from({ length: 10 }, (_, i) => null)
  );

  constructor() {
    this.#randomlyPlaceShips();
  }

  get shipsPlacement() {
    const copyOfShipPlacement = [];
    for (const row of this.#shipsPlacement) {
      copyOfShipPlacement.push(row.map((cell) => cell !== null));
    }
    return copyOfShipPlacement;
  }

  get board() {
    const copyOfBoard = [];
    for (const row of this.#board) {
      copyOfBoard.push([...row]);
    }
    return copyOfBoard;
  }

  get allShipsSunk() {
    for (const ship of this.#ships) {
      if (!ship.isSunk) return false;
    }
    return true;
  }

  receiveAttack(x, y) {
    if (this.#board[x][y]) {
      return false;
    }

    if (this.#shipsPlacement[x][y]) {
      this.#shipsPlacement[x][y].hit();
      this.#board[x][y] = cellState.hit;
    } else {
      this.#board[x][y] = cellState.miss;
    }
    return true;
  }

  #getRandomNumberFrom0ToMax(max) {
    return Math.floor(Math.random() * (max - 1));
  }

  get #randomBoolean() {
    return Math.random() < 0.5;
  }

  #randomlyPlaceShips() {
    const remainingCells = Array.from({ length: 100 }, (_, i) => i);

    for (const ship of this.#ships) {
      const maxIndex = remainingCells.length - 1;
      let cellIndex = this.#getRandomNumberFrom0ToMax(maxIndex);
      const oldCellIndex = cellIndex;
      let isHorizontal = this.#randomBoolean;

      while (
        !this.#canPlaceShipOfLengthInCell(
          remainingCells[cellIndex],
          isHorizontal,
          ship.length
        )
      ) {
        if (cellIndex === oldCellIndex) {
          isHorizontal = !isHorizontal;
        }
        cellIndex = (cellIndex + 1) % remainingCells.length;
      }
      this.#placeShipInCellNumber(
        remainingCells[cellIndex],
        isHorizontal,
        ship
      );
      remainingCells.splice(cellIndex, 1);
    }
  }

  #canPlaceShipOfLengthInCell(cellNumber, isHorizontal, length) {
    const { row, col } = this.#getRowAndColumnFrom(cellNumber);

    if (isHorizontal) {
      const lengthExceedsBorder = col + length > 10;

      const isShipOnEnd =
        this.#shipsPlacement[row][Math.max(col - 1, 0)] ||
        this.#shipsPlacement[row][Math.min(col + 1, 9)];

      if (lengthExceedsBorder || isShipOnEnd) return false;

      for (let curCol = col; curCol < col + length; curCol++) {
        const isShipInCell = this.#shipsPlacement[row][curCol];

        const isShipOnSide =
          this.#shipsPlacement[Math.max(row - 1, 0)][curCol] ||
          this.#shipsPlacement[Math.min(row + 1, 9)][curCol];

        if (isShipInCell || isShipOnSide) return false;
      }
      return true;
    }

    const lengthExceedsBorder = row + length > 10;

    const isShipOnEnd =
      this.#shipsPlacement[Math.max(row - 1, 0)][col] ||
      this.#shipsPlacement[Math.min(row + 1, 9)][col];

    if (lengthExceedsBorder || isShipOnEnd) return false;

    for (let curRow = row; curRow < row + length; curRow++) {
      const isShipInCell = this.#shipsPlacement[curRow][col];

      const isShipOnSide =
        this.#shipsPlacement[curRow][Math.max(col - 1, 0)] ||
        this.#shipsPlacement[curRow][Math.min(col + 1, 9)];

      if (isShipInCell || isShipOnSide) return false;
    }
    return true;
  }

  #getRowAndColumnFrom(cellNumber) {
    return {
      row: Math.floor(cellNumber / 10),
      col: cellNumber % 10,
    };
  }

  #placeShipInCellNumber(cellNumber, isHorizontal, ship) {
    const { row, col } = this.#getRowAndColumnFrom(cellNumber);

    if (isHorizontal) {
      for (let curCol = col; curCol < col + ship.length; curCol++) {
        this.#shipsPlacement[row][curCol] = ship;
      }
      return;
    }
    for (let curRow = row; curRow < row + ship.length; curRow++) {
      this.#shipsPlacement[curRow][col] = ship;
    }
  }

  reset() {
    this.#shipsPlacement = Array.from({ length: 10 }, (_) =>
      Array.from({ length: 10 }, (_, i) => null)
    );

    this.#ships.forEach((ship) => ship.reset());

    this.#board = Array.from({ length: 10 }, (_) =>
      Array.from({ length: 10 }, (_, i) => null)
    );

    this.#randomlyPlaceShips();
  }
}
