"use strict";
(self["webpackChunkbattleship_theodinproject"] = self["webpackChunkbattleship_theodinproject"] || []).push([["main"],{

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/gameboard */ "./src/model/gameboard.js");
/* harmony import */ var _view_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/view */ "./src/view/view.js");
/* harmony import */ var _view_insertPlayerBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/insertPlayerBoard */ "./src/view/insertPlayerBoard.js");
/* harmony import */ var _view_insertOpponentBoard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/insertOpponentBoard */ "./src/view/insertOpponentBoard.js");

// import Player from "./model/player";




const startGameLoop = function () {
  const playerGameBoard = new _model_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
  const computerGameBoard = new _model_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();

  // const player = new Player(computerGameBoard);
  // const computer = new Player(playerGameBoard);

  (0,_view_view__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_view_insertPlayerBoard__WEBPACK_IMPORTED_MODULE_2__["default"])(playerGameBoard.shipsPlacement);
  (0,_view_insertOpponentBoard__WEBPACK_IMPORTED_MODULE_3__["default"])(computerGameBoard.board);

  // TO DO: game loop
};

startGameLoop();

/***/ }),

/***/ "./src/model/cellState.js":
/*!********************************!*\
  !*** ./src/model/cellState.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  miss: "M",
  hit: "H"
});

/***/ }),

/***/ "./src/model/gameboard.js":
/*!********************************!*\
  !*** ./src/model/gameboard.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GameBoard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/model/ship.js");
/* harmony import */ var _cellState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cellState */ "./src/model/cellState.js");


class GameBoard {
  #shipsPlacement = Array.from({
    length: 10
  }, _ => Array.from({
    length: 10
  }, (_, i) => null));
  #ships = [new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](4), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](3), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](2), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](2), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](2), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](1), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](1), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](1), new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](1)];
  #board = Array.from({
    length: 10
  }, _ => Array.from({
    length: 10
  }, (_, i) => null));
  constructor() {
    this.#randomlyPlaceShips();
  }
  get shipsPlacement() {
    const copyOfShipPlacement = [];
    for (const row of this.#shipsPlacement) {
      copyOfShipPlacement.push(row.map(cell => cell !== null));
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
      this.#board[x][y] = _cellState__WEBPACK_IMPORTED_MODULE_1__["default"].hit;
    } else {
      this.#board[x][y] = _cellState__WEBPACK_IMPORTED_MODULE_1__["default"].miss;
    }
    return true;
  }
  #getRandomNumberFrom0ToMax(max) {
    return Math.floor(Math.random() * (max - 1));
  }
  get _randomBoolean() {
    return Math.random() < 0.5;
  }
  #randomlyPlaceShips() {
    const remainingCells = Array.from({
      length: 100
    }, (_, i) => i);
    for (const ship of this.#ships) {
      const maxIndex = remainingCells.length - 1;
      let cellIndex = this.#getRandomNumberFrom0ToMax(maxIndex);
      const oldCellIndex = cellIndex;
      let isHorizontal = this._randomBoolean;
      while (!this.#canPlaceShipOfLengthInCell(remainingCells[cellIndex], isHorizontal, ship.length)) {
        if (cellIndex === oldCellIndex) {
          isHorizontal = !isHorizontal;
        }
        cellIndex = (cellIndex + 1) % remainingCells.length;
      }
      this.#placeShipInCellNumber(remainingCells[cellIndex], isHorizontal, ship);
      remainingCells.splice(cellIndex, 1);
    }
  }
  #canPlaceShipOfLengthInCell(cellNumber, isHorizontal, length) {
    const {
      row,
      col
    } = this.#getRowAndColumnFrom(cellNumber);
    if (isHorizontal) {
      for (let curCol = col; curCol < col + length; curCol++) {
        if (curCol >= 10) return false;
        if (this.#shipsPlacement[row][curCol]) return false;
      }
      return true;
    }
    for (let curRow = row; curRow < row + length; curRow++) {
      if (curRow >= 10) return false;
      if (this.#shipsPlacement[curRow][col]) return false;
    }
    return true;
  }
  #getRowAndColumnFrom(cellNumber) {
    return {
      row: Math.floor(cellNumber / 10),
      col: cellNumber % 10
    };
  }
  #placeShipInCellNumber(cellNumber, isHorizontal, ship) {
    const {
      row,
      col
    } = this.#getRowAndColumnFrom(cellNumber);
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
}

/***/ }),

/***/ "./src/model/ship.js":
/*!***************************!*\
  !*** ./src/model/ship.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Ship)
/* harmony export */ });
class Ship {
  #length;
  #hits = 0;
  constructor(length) {
    this.#length = length;
  }
  get isSunk() {
    return this.#length === this.#hits;
  }
  get length() {
    return this.#length;
  }
  get hits() {
    return this.#hits;
  }
  hit() {
    if (this.isSunk) {
      return;
    }
    this.#hits++;
  }
}

/***/ }),

/***/ "./src/view/insertOpponentBoard.js":
/*!*****************************************!*\
  !*** ./src/view/insertOpponentBoard.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ insertPlayerBoard)
/* harmony export */ });
/* harmony import */ var _model_cellState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/cellState */ "./src/model/cellState.js");

function insertPlayerBoard(opponentBoard, handleClickOnCell) {
  const boardElement = document.getElementById("right-board");
  boardElement.innerHTML = "";
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.cellNumber = x * 10 + y;
      if (opponentBoard[x][y] === _model_cellState__WEBPACK_IMPORTED_MODULE_0__["default"].hit) {
        cellElement.classList.add("ship-hit-cell");
      } else if (opponentBoard[x][y] === _model_cellState__WEBPACK_IMPORTED_MODULE_0__["default"].miss) {
        cellElement.classList.add("ship-miss-cell");
      } else {
        cellElement.classList.add("empty-cell");
      }
      boardElement.insertAdjacentElement("beforeend", cellElement);
    }
  }
  boardElement.addEventListener("click", event => {
    const cell = event.target.closest(".cell");
    if (!cell) return;
    handleClickOnCell(cell.dataset.cellNumber);
  });
  return boardElement;
}

/***/ }),

/***/ "./src/view/insertPlayerBoard.js":
/*!***************************************!*\
  !*** ./src/view/insertPlayerBoard.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ insertPlayerBoard)
/* harmony export */ });
function insertPlayerBoard(playerBoard) {
  const boardElement = document.getElementById("left-board");
  boardElement.innerHTML = "";
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.cellNumber = x * 10 + y;
      if (playerBoard[x][y]) {
        cellElement.classList.add("ship-open-cell");
      } else {
        cellElement.classList.add("empty-cell");
      }
      boardElement.insertAdjacentElement("beforeend", cellElement);
    }
  }
  return boardElement;
}

/***/ }),

/***/ "./src/view/view.js":
/*!**************************!*\
  !*** ./src/view/view.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createStartView)
/* harmony export */ });
function createStartView() {
  const header = document.createElement("div");
  header.textContent = "Battleship";
  document.body.insertAdjacentElement("beforeend", header);
  const boardsContainer = document.createElement("div");
  boardsContainer.className = "boards-container";
  document.body.insertAdjacentElement("beforeend", boardsContainer);
  const leftBoard = document.createElement("div");
  leftBoard.className = "board";
  leftBoard.id = "left-board";
  const rightBoard = document.createElement("div");
  rightBoard.className = "board";
  rightBoard.id = "right-board";
  boardsContainer.insertAdjacentElement("beforeend", leftBoard);
  boardsContainer.insertAdjacentElement("beforeend", rightBoard);
}

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/controller.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFlLENBQUNiLFNBQVMsR0FBRyxrQkFBa0I7RUFFOUNMLFFBQVEsQ0FBQ2lCLElBQUksQ0FBQ1IscUJBQXFCLENBQUMsV0FBVyxFQUFFUyxlQUFlLENBQUM7RUFFakUsTUFBTUMsU0FBUyxHQUFHbkIsUUFBUSxDQUFDSSxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQy9DZSxTQUFTLENBQUNkLFNBQVMsR0FBRyxPQUFPO0VBQzdCYyxTQUFTLENBQUNDLEVBQUUsR0FBRyxZQUFZO0VBRTNCLE1BQU1DLFVBQVUsR0FBR3JCLFFBQVEsQ0FBQ0ksYUFBYSxDQUFDLEtBQUssQ0FBQztFQUNoRGlCLFVBQVUsQ0FBQ2hCLFNBQVMsR0FBRyxPQUFPO0VBQzlCZ0IsVUFBVSxDQUFDRCxFQUFFLEdBQUcsYUFBYTtFQUU3QkYsZUFBZSxDQUFDVCxxQkFBcUIsQ0FBQyxXQUFXLEVBQUVVLFNBQVMsQ0FBQztFQUM3REQsZUFBZSxDQUFDVCxxQkFBcUIsQ0FBQyxXQUFXLEVBQUVZLFVBQVUsQ0FBQztBQUNoRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRoZW9kaW5wcm9qZWN0Ly4vc3JjL21vZGVsL2NlbGxTdGF0ZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRoZW9kaW5wcm9qZWN0Ly4vc3JjL21vZGVsL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRoZW9kaW5wcm9qZWN0Ly4vc3JjL21vZGVsL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10aGVvZGlucHJvamVjdC8uL3NyYy92aWV3L2luc2VydE9wcG9uZW50Qm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10aGVvZGlucHJvamVjdC8uL3NyYy92aWV3L2luc2VydFBsYXllckJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9zcmMvdmlldy92aWV3LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lQm9hcmQgZnJvbSBcIi4vbW9kZWwvZ2FtZWJvYXJkXCI7XG4vLyBpbXBvcnQgUGxheWVyIGZyb20gXCIuL21vZGVsL3BsYXllclwiO1xuXG5pbXBvcnQgY3JlYXRlU3RhcnRWaWV3IGZyb20gXCIuL3ZpZXcvdmlld1wiO1xuaW1wb3J0IGluc2VydFBsYXllckJvYXJkIGZyb20gXCIuL3ZpZXcvaW5zZXJ0UGxheWVyQm9hcmRcIjtcbmltcG9ydCBpbnNlcnRPcHBvbmVudEJvYXJkIGZyb20gXCIuL3ZpZXcvaW5zZXJ0T3Bwb25lbnRCb2FyZFwiO1xuXG5jb25zdCBzdGFydEdhbWVMb29wID0gZnVuY3Rpb24gKCkge1xuICBjb25zdCBwbGF5ZXJHYW1lQm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XG4gIGNvbnN0IGNvbXB1dGVyR2FtZUJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuXG4gIC8vIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoY29tcHV0ZXJHYW1lQm9hcmQpO1xuICAvLyBjb25zdCBjb21wdXRlciA9IG5ldyBQbGF5ZXIocGxheWVyR2FtZUJvYXJkKTtcblxuICBjcmVhdGVTdGFydFZpZXcoKTtcbiAgaW5zZXJ0UGxheWVyQm9hcmQocGxheWVyR2FtZUJvYXJkLnNoaXBzUGxhY2VtZW50KTtcbiAgaW5zZXJ0T3Bwb25lbnRCb2FyZChjb21wdXRlckdhbWVCb2FyZC5ib2FyZCk7XG5cbiAgLy8gVE8gRE86IGdhbWUgbG9vcFxufTtcblxuc3RhcnRHYW1lTG9vcCgpO1xuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBtaXNzOiBcIk1cIixcbiAgaGl0OiBcIkhcIixcbn07XG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgY2VsbFN0YXRlIGZyb20gXCIuL2NlbGxTdGF0ZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQm9hcmQge1xuICAjc2hpcHNQbGFjZW1lbnQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCAoXykgPT5cbiAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCAoXywgaSkgPT4gbnVsbClcbiAgKTtcblxuICAjc2hpcHMgPSBbXG4gICAgbmV3IFNoaXAoNCksXG4gICAgbmV3IFNoaXAoMyksXG4gICAgbmV3IFNoaXAoMyksXG4gICAgbmV3IFNoaXAoMiksXG4gICAgbmV3IFNoaXAoMiksXG4gICAgbmV3IFNoaXAoMiksXG4gICAgbmV3IFNoaXAoMSksXG4gICAgbmV3IFNoaXAoMSksXG4gICAgbmV3IFNoaXAoMSksXG4gICAgbmV3IFNoaXAoMSksXG4gIF07XG5cbiAgI2JvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8pID0+XG4gICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+IG51bGwpXG4gICk7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy4jcmFuZG9tbHlQbGFjZVNoaXBzKCk7XG4gIH1cblxuICBnZXQgc2hpcHNQbGFjZW1lbnQoKSB7XG4gICAgY29uc3QgY29weU9mU2hpcFBsYWNlbWVudCA9IFtdO1xuICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMuI3NoaXBzUGxhY2VtZW50KSB7XG4gICAgICBjb3B5T2ZTaGlwUGxhY2VtZW50LnB1c2gocm93Lm1hcCgoY2VsbCkgPT4gY2VsbCAhPT0gbnVsbCkpO1xuICAgIH1cbiAgICByZXR1cm4gY29weU9mU2hpcFBsYWNlbWVudDtcbiAgfVxuXG4gIGdldCBib2FyZCgpIHtcbiAgICBjb25zdCBjb3B5T2ZCb2FyZCA9IFtdO1xuICAgIGZvciAoY29uc3Qgcm93IG9mIHRoaXMuI2JvYXJkKSB7XG4gICAgICBjb3B5T2ZCb2FyZC5wdXNoKFsuLi5yb3ddKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvcHlPZkJvYXJkO1xuICB9XG5cbiAgZ2V0IGFsbFNoaXBzU3VuaygpIHtcbiAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy4jc2hpcHMpIHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmspIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZWNlaXZlQXR0YWNrKHgsIHkpIHtcbiAgICBpZiAodGhpcy4jYm9hcmRbeF1beV0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jc2hpcHNQbGFjZW1lbnRbeF1beV0pIHtcbiAgICAgIHRoaXMuI3NoaXBzUGxhY2VtZW50W3hdW3ldLmhpdCgpO1xuICAgICAgdGhpcy4jYm9hcmRbeF1beV0gPSBjZWxsU3RhdGUuaGl0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiNib2FyZFt4XVt5XSA9IGNlbGxTdGF0ZS5taXNzO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gICNnZXRSYW5kb21OdW1iZXJGcm9tMFRvTWF4KG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gMSkpO1xuICB9XG5cbiAgZ2V0IF9yYW5kb21Cb29sZWFuKCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpIDwgMC41O1xuICB9XG5cbiAgI3JhbmRvbWx5UGxhY2VTaGlwcygpIHtcbiAgICBjb25zdCByZW1haW5pbmdDZWxscyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwMCB9LCAoXywgaSkgPT4gaSk7XG5cbiAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy4jc2hpcHMpIHtcbiAgICAgIGNvbnN0IG1heEluZGV4ID0gcmVtYWluaW5nQ2VsbHMubGVuZ3RoIC0gMTtcbiAgICAgIGxldCBjZWxsSW5kZXggPSB0aGlzLiNnZXRSYW5kb21OdW1iZXJGcm9tMFRvTWF4KG1heEluZGV4KTtcbiAgICAgIGNvbnN0IG9sZENlbGxJbmRleCA9IGNlbGxJbmRleDtcbiAgICAgIGxldCBpc0hvcml6b250YWwgPSB0aGlzLl9yYW5kb21Cb29sZWFuO1xuXG4gICAgICB3aGlsZSAoXG4gICAgICAgICF0aGlzLiNjYW5QbGFjZVNoaXBPZkxlbmd0aEluQ2VsbChcbiAgICAgICAgICByZW1haW5pbmdDZWxsc1tjZWxsSW5kZXhdLFxuICAgICAgICAgIGlzSG9yaXpvbnRhbCxcbiAgICAgICAgICBzaGlwLmxlbmd0aFxuICAgICAgICApXG4gICAgICApIHtcbiAgICAgICAgaWYgKGNlbGxJbmRleCA9PT0gb2xkQ2VsbEluZGV4KSB7XG4gICAgICAgICAgaXNIb3Jpem9udGFsID0gIWlzSG9yaXpvbnRhbDtcbiAgICAgICAgfVxuICAgICAgICBjZWxsSW5kZXggPSAoY2VsbEluZGV4ICsgMSkgJSByZW1haW5pbmdDZWxscy5sZW5ndGg7XG4gICAgICB9XG4gICAgICB0aGlzLiNwbGFjZVNoaXBJbkNlbGxOdW1iZXIoXG4gICAgICAgIHJlbWFpbmluZ0NlbGxzW2NlbGxJbmRleF0sXG4gICAgICAgIGlzSG9yaXpvbnRhbCxcbiAgICAgICAgc2hpcFxuICAgICAgKTtcbiAgICAgIHJlbWFpbmluZ0NlbGxzLnNwbGljZShjZWxsSW5kZXgsIDEpO1xuICAgIH1cbiAgfVxuXG4gICNjYW5QbGFjZVNoaXBPZkxlbmd0aEluQ2VsbChjZWxsTnVtYmVyLCBpc0hvcml6b250YWwsIGxlbmd0aCkge1xuICAgIGNvbnN0IHsgcm93LCBjb2wgfSA9IHRoaXMuI2dldFJvd0FuZENvbHVtbkZyb20oY2VsbE51bWJlcik7XG5cbiAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICBmb3IgKGxldCBjdXJDb2wgPSBjb2w7IGN1ckNvbCA8IGNvbCArIGxlbmd0aDsgY3VyQ29sKyspIHtcbiAgICAgICAgaWYgKGN1ckNvbCA+PSAxMCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodGhpcy4jc2hpcHNQbGFjZW1lbnRbcm93XVtjdXJDb2xdKSByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBjdXJSb3cgPSByb3c7IGN1clJvdyA8IHJvdyArIGxlbmd0aDsgY3VyUm93KyspIHtcbiAgICAgIGlmIChjdXJSb3cgPj0gMTApIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICh0aGlzLiNzaGlwc1BsYWNlbWVudFtjdXJSb3ddW2NvbF0pIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAjZ2V0Um93QW5kQ29sdW1uRnJvbShjZWxsTnVtYmVyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvdzogTWF0aC5mbG9vcihjZWxsTnVtYmVyIC8gMTApLFxuICAgICAgY29sOiBjZWxsTnVtYmVyICUgMTAsXG4gICAgfTtcbiAgfVxuXG4gICNwbGFjZVNoaXBJbkNlbGxOdW1iZXIoY2VsbE51bWJlciwgaXNIb3Jpem9udGFsLCBzaGlwKSB7XG4gICAgY29uc3QgeyByb3csIGNvbCB9ID0gdGhpcy4jZ2V0Um93QW5kQ29sdW1uRnJvbShjZWxsTnVtYmVyKTtcblxuICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgIGZvciAobGV0IGN1ckNvbCA9IGNvbDsgY3VyQ29sIDwgY29sICsgc2hpcC5sZW5ndGg7IGN1ckNvbCsrKSB7XG4gICAgICAgIHRoaXMuI3NoaXBzUGxhY2VtZW50W3Jvd11bY3VyQ29sXSA9IHNoaXA7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAobGV0IGN1clJvdyA9IHJvdzsgY3VyUm93IDwgcm93ICsgc2hpcC5sZW5ndGg7IGN1clJvdysrKSB7XG4gICAgICB0aGlzLiNzaGlwc1BsYWNlbWVudFtjdXJSb3ddW2NvbF0gPSBzaGlwO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcCB7XG4gICNsZW5ndGg7XG4gICNoaXRzID0gMDtcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XG4gICAgdGhpcy4jbGVuZ3RoID0gbGVuZ3RoO1xuICB9XG5cbiAgZ2V0IGlzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy4jbGVuZ3RoID09PSB0aGlzLiNoaXRzO1xuICB9XG5cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy4jbGVuZ3RoO1xuICB9XG5cbiAgZ2V0IGhpdHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2hpdHM7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgaWYgKHRoaXMuaXNTdW5rKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuI2hpdHMrKztcbiAgfVxufVxuIiwiaW1wb3J0IGNlbGxTdGF0ZSBmcm9tIFwiLi4vbW9kZWwvY2VsbFN0YXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluc2VydFBsYXllckJvYXJkKG9wcG9uZW50Qm9hcmQsIGhhbmRsZUNsaWNrT25DZWxsKSB7XG4gIGNvbnN0IGJvYXJkRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmlnaHQtYm9hcmRcIik7XG4gIGJvYXJkRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2VsbEVsZW1lbnQuY2xhc3NOYW1lID0gXCJjZWxsXCI7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LmNlbGxOdW1iZXIgPSB4ICogMTAgKyB5O1xuXG4gICAgICBpZiAob3Bwb25lbnRCb2FyZFt4XVt5XSA9PT0gY2VsbFN0YXRlLmhpdCkge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcC1oaXQtY2VsbFwiKTtcbiAgICAgIH0gZWxzZSBpZiAob3Bwb25lbnRCb2FyZFt4XVt5XSA9PT0gY2VsbFN0YXRlLm1pc3MpIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXAtbWlzcy1jZWxsXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVtcHR5LWNlbGxcIik7XG4gICAgICB9XG5cbiAgICAgIGJvYXJkRWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgY2VsbEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGJvYXJkRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgY2VsbCA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmNlbGxcIik7XG4gICAgaWYgKCFjZWxsKSByZXR1cm47XG5cbiAgICBoYW5kbGVDbGlja09uQ2VsbChjZWxsLmRhdGFzZXQuY2VsbE51bWJlcik7XG4gIH0pO1xuXG4gIHJldHVybiBib2FyZEVsZW1lbnQ7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbnNlcnRQbGF5ZXJCb2FyZChwbGF5ZXJCb2FyZCkge1xuICBjb25zdCBib2FyZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlZnQtYm9hcmRcIik7XG4gIGJvYXJkRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xuXG4gIGZvciAobGV0IHggPSAwOyB4IDwgMTA7IHgrKykge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMTA7IHkrKykge1xuICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgY2VsbEVsZW1lbnQuY2xhc3NOYW1lID0gXCJjZWxsXCI7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LmNlbGxOdW1iZXIgPSB4ICogMTAgKyB5O1xuXG4gICAgICBpZiAocGxheWVyQm9hcmRbeF1beV0pIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXAtb3Blbi1jZWxsXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVtcHR5LWNlbGxcIik7XG4gICAgICB9XG5cbiAgICAgIGJvYXJkRWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgY2VsbEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYm9hcmRFbGVtZW50O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU3RhcnRWaWV3KCkge1xuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gIGhlYWRlci50ZXh0Q29udGVudCA9IFwiQmF0dGxlc2hpcFwiO1xuICBkb2N1bWVudC5ib2R5Lmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBoZWFkZXIpO1xuXG4gIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgYm9hcmRzQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYm9hcmRzLWNvbnRhaW5lclwiO1xuXG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGJvYXJkc0NvbnRhaW5lcik7XG5cbiAgY29uc3QgbGVmdEJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGVmdEJvYXJkLmNsYXNzTmFtZSA9IFwiYm9hcmRcIjtcbiAgbGVmdEJvYXJkLmlkID0gXCJsZWZ0LWJvYXJkXCI7XG5cbiAgY29uc3QgcmlnaHRCb2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHJpZ2h0Qm9hcmQuY2xhc3NOYW1lID0gXCJib2FyZFwiO1xuICByaWdodEJvYXJkLmlkID0gXCJyaWdodC1ib2FyZFwiO1xuXG4gIGJvYXJkc0NvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgbGVmdEJvYXJkKTtcbiAgYm9hcmRzQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCByaWdodEJvYXJkKTtcbn1cbiJdLCJuYW1lcyI6WyJHYW1lQm9hcmQiLCJjcmVhdGVTdGFydFZpZXciLCJpbnNlcnRQbGF5ZXJCb2FyZCIsImluc2VydE9wcG9uZW50Qm9hcmQiLCJzdGFydEdhbWVMb29wIiwicGxheWVyR2FtZUJvYXJkIiwiY29tcHV0ZXJHYW1lQm9hcmQiLCJzaGlwc1BsYWNlbWVudCIsImJvYXJkIiwibWlzcyIsImhpdCIsIlNoaXAiLCJjZWxsU3RhdGUiLCJBcnJheSIsImZyb20iLCJsZW5ndGgiLCJfIiwiaSIsInNoaXBzIiwiY29uc3RydWN0b3IiLCJyYW5kb21seVBsYWNlU2hpcHMiLCJjb3B5T2ZTaGlwUGxhY2VtZW50Iiwicm93IiwicHVzaCIsIm1hcCIsImNlbGwiLCJjb3B5T2ZCb2FyZCIsImFsbFNoaXBzU3VuayIsInNoaXAiLCJpc1N1bmsiLCJyZWNlaXZlQXR0YWNrIiwieCIsInkiLCJnZXRSYW5kb21OdW1iZXJGcm9tMFRvTWF4IiwiI2dldFJhbmRvbU51bWJlckZyb20wVG9NYXgiLCJtYXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJfcmFuZG9tQm9vbGVhbiIsIiNyYW5kb21seVBsYWNlU2hpcHMiLCJyZW1haW5pbmdDZWxscyIsIm1heEluZGV4IiwiY2VsbEluZGV4Iiwib2xkQ2VsbEluZGV4IiwiaXNIb3Jpem9udGFsIiwiY2FuUGxhY2VTaGlwT2ZMZW5ndGhJbkNlbGwiLCJwbGFjZVNoaXBJbkNlbGxOdW1iZXIiLCJzcGxpY2UiLCIjY2FuUGxhY2VTaGlwT2ZMZW5ndGhJbkNlbGwiLCJjZWxsTnVtYmVyIiwiY29sIiwiZ2V0Um93QW5kQ29sdW1uRnJvbSIsImN1ckNvbCIsImN1clJvdyIsIiNnZXRSb3dBbmRDb2x1bW5Gcm9tIiwiI3BsYWNlU2hpcEluQ2VsbE51bWJlciIsImhpdHMiLCJvcHBvbmVudEJvYXJkIiwiaGFuZGxlQ2xpY2tPbkNlbGwiLCJib2FyZEVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJIVE1MIiwiY2VsbEVsZW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiZGF0YXNldCIsImNsYXNzTGlzdCIsImFkZCIsImluc2VydEFkamFjZW50RWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhcmdldCIsImNsb3Nlc3QiLCJwbGF5ZXJCb2FyZCIsImhlYWRlciIsInRleHRDb250ZW50IiwiYm9keSIsImJvYXJkc0NvbnRhaW5lciIsImxlZnRCb2FyZCIsImlkIiwicmlnaHRCb2FyZCJdLCJzb3VyY2VSb290IjoiIn0=