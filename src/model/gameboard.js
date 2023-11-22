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

  receiveAttack(row, col) {
    if (this.#board[row][col]) {
      return false;
    }

    if (this.#shipsPlacement[row][col]) {
      this.#shipsPlacement[row][col].hit();
      this.#board[row][col] = cellState.hit;
    } else {
      this.#board[row][col] = cellState.miss;
    }
    return true;
  }

  #randIntFrom0ToMax(max) {
    return Math.floor(Math.random() * (max - 1));
  }

  get #randomBoolean() {
    return Math.random() < 0.5;
  }

  #getCoordsOfNthFreeCellInShipsPlacement(n) {
    let currentFreeCellNumber = -1;
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        if (!this.#shipsPlacement[row][col]) {
          currentFreeCellNumber++;
          if (currentFreeCellNumber === n) {
            return { row, col };
          }
        }
      }
    }
    return null;
  }

  #randomlyPlaceShips() {
    let remainingCells = 100;

    for (const ship of this.#ships) {
      let freeCellNumber = this.#randIntFrom0ToMax(remainingCells - 1);
      const isHorizontal = this.#randomBoolean;

      let coords = this.#getCoordsOfNthFreeCellInShipsPlacement(freeCellNumber);

      while (!this.#canPlaceShipInCell(coords, isHorizontal, ship.length)) {
        freeCellNumber = (freeCellNumber + 1) % remainingCells;
        coords = this.#getCoordsOfNthFreeCellInShipsPlacement(freeCellNumber);
      }
      this.#placeShipInCellNumber(coords, isHorizontal, ship);

      remainingCells -= ship.length;
    }
  }

  #canPlaceShipInCell(coords, isHorizontal, length) {
    if (isHorizontal) {
      return this.#canPlaceShipInCellHorizontal(coords, length);
    }
    return this.#canPlaceShipInCellVertical(coords, length);
  }

  #canPlaceShipInCellHorizontal({ row, col }, length) {
    const lengthExceedsBorder = col + length > 10;

    const leftEndCol = Math.max(col - 1, 0);
    const leftEndNotFree = this.#shipsPlacement[row][leftEndCol];

    const rightEndCol = Math.min(col + length, 9);
    const rightEndNotFree = this.#shipsPlacement[row][rightEndCol];

    if (lengthExceedsBorder || leftEndNotFree || rightEndNotFree) {
      return false;
    }

    for (let curCol = col; curCol < col + length; curCol++) {
      const cellNotFree = this.#shipsPlacement[row][curCol];

      const topSideRow = Math.max(row - 1, 0);
      const topSideNotFree = this.#shipsPlacement[topSideRow][curCol];

      const bottomSideRow = Math.min(row + 1, 9);
      const bottomSideNotFree = this.#shipsPlacement[bottomSideRow][curCol];

      if (cellNotFree || topSideNotFree || bottomSideNotFree) {
        return false;
      }
    }
    return true;
  }

  #canPlaceShipInCellVertical({ row, col }, length) {
    const lengthExceedsBorder = row + length > 10;

    const topRow = Math.max(row - 1, 0);
    const topEndNotFree = this.#shipsPlacement[topRow][col];

    const bottomRow = Math.min(row + length, 9);
    const bottomEndNotFree = this.#shipsPlacement[bottomRow][col];

    if (lengthExceedsBorder || topEndNotFree || bottomEndNotFree) {
      return false;
    }

    for (let curRow = row; curRow < row + length; curRow++) {
      const cellNotFree = this.#shipsPlacement[curRow][col];

      const leftCol = Math.max(col - 1, 0);
      const leftSideNotFree = this.#shipsPlacement[curRow][leftCol];

      const rightCol = Math.min(col + 1, 9);
      const rightSideNotFree = this.#shipsPlacement[curRow][rightCol];

      if (cellNotFree || leftSideNotFree || rightSideNotFree) return false;
    }
    return true;
  }

  #placeShipInCellNumber({ row, col }, isHorizontal, ship) {
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
