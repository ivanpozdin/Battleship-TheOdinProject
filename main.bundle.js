"use strict";
(self["webpackChunkbattleship_theodinproject"] = self["webpackChunkbattleship_theodinproject"] || []).push([["main"],{

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _model_cellState__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/cellState */ "./src/model/cellState.js");
/* harmony import */ var _model_gameboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/gameboard */ "./src/model/gameboard.js");
/* harmony import */ var _model_player__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./model/player */ "./src/model/player.js");
/* harmony import */ var _view_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/view */ "./src/view/view.js");
/* harmony import */ var _view_insertPlayerBoard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/insertPlayerBoard */ "./src/view/insertPlayerBoard.js");
/* harmony import */ var _view_insertOpponentBoard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/insertOpponentBoard */ "./src/view/insertOpponentBoard.js");
/* harmony import */ var _view_gameOver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/gameOver */ "./src/view/gameOver.js");
/* harmony import */ var _view_insertStartWindow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view/insertStartWindow */ "./src/view/insertStartWindow.js");
// eslint-disable-next-line no-unused-vars









const timer = async function (ms) {
  return new Promise(resolve => setTimeout(() => {
    resolve();
  }, ms));
};
const moveComputer = async function (computer, player, handleGameOver) {
  computer.isAttacking = true;
  await timer(500);
  let coords = computer.attack();
  while (player.board[coords.row][coords.col] === _model_cellState__WEBPACK_IMPORTED_MODULE_1__["default"].hit) {
    (0,_view_insertPlayerBoard__WEBPACK_IMPORTED_MODULE_5__["default"])(player.shipsPlacement, player.board);
    if (player.allShipsSunk) {
      (0,_view_gameOver__WEBPACK_IMPORTED_MODULE_7__["default"])("Computer", handleGameOver);
      return;
    }
    await timer(500);
    coords = computer.attack();
  }
  (0,_view_insertPlayerBoard__WEBPACK_IMPORTED_MODULE_5__["default"])(player.shipsPlacement, player.board);
  computer.isAttacking = false;
  if (player.allShipsSunk) {
    (0,_view_gameOver__WEBPACK_IMPORTED_MODULE_7__["default"])("Computer", handleGameOver);
  }
};
const handleAttack = async function (player, computer, handleGameOver, _ref) {
  let {
    row,
    col
  } = _ref;
  if (player.allShipsSunk || computer.allShipsSunk || computer.isAttacking) {
    return;
  }
  if (!player.attack({
    row,
    col
  })) return;
  (0,_view_insertOpponentBoard__WEBPACK_IMPORTED_MODULE_6__["default"])(computer.board, handleAttack.bind(null, player, computer, handleGameOver));
  if (computer.allShipsSunk) {
    (0,_view_gameOver__WEBPACK_IMPORTED_MODULE_7__["default"])("You", handleGameOver);
    return;
  }
  const playerHit = computer.board[row][col] === _model_cellState__WEBPACK_IMPORTED_MODULE_1__["default"].hit;
  if (playerHit) return;
  await moveComputer(computer, player, handleGameOver);
};
const startGameLoop = function (addedShips) {
  const playerGameBoard = new _model_gameboard__WEBPACK_IMPORTED_MODULE_2__["default"](addedShips);
  const computerGameBoard = new _model_gameboard__WEBPACK_IMPORTED_MODULE_2__["default"]();
  const player = new _model_player__WEBPACK_IMPORTED_MODULE_3__["default"](playerGameBoard, computerGameBoard);
  const computer = new _model_player__WEBPACK_IMPORTED_MODULE_3__["default"](computerGameBoard, playerGameBoard);
  const handlePlayAgain = function () {
    (0,_view_insertStartWindow__WEBPACK_IMPORTED_MODULE_8__["default"])(startGameLoop);
  };
  (0,_view_view__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_view_insertPlayerBoard__WEBPACK_IMPORTED_MODULE_5__["default"])(player.shipsPlacement, player.board);
  (0,_view_insertOpponentBoard__WEBPACK_IMPORTED_MODULE_6__["default"])(computer.board, handleAttack.bind(null, player, computer, handlePlayAgain));
};
(0,_view_insertStartWindow__WEBPACK_IMPORTED_MODULE_8__["default"])(startGameLoop);

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
  constructor(addedShips) {
    if (!addedShips) {
      this.#randomlyPlaceShips();
      return;
    }
    for (let i = 0; i < 10; i++) {
      const {
        row,
        col,
        isHorizontal
      } = addedShips[i];
      const ship = this.#ships[i];
      this.#placeShipInCellNumber({
        row,
        col
      }, isHorizontal, ship);
    }
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
  receiveAttack(row, col) {
    if (this.#board[row][col]) {
      return false;
    }
    if (this.#shipsPlacement[row][col]) {
      this.#shipsPlacement[row][col].hit();
      this.#board[row][col] = _cellState__WEBPACK_IMPORTED_MODULE_1__["default"].hit;
    } else {
      this.#board[row][col] = _cellState__WEBPACK_IMPORTED_MODULE_1__["default"].miss;
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
            return {
              row,
              col
            };
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
  #canPlaceShipInCellHorizontal(_ref, length) {
    let {
      row,
      col
    } = _ref;
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
  #canPlaceShipInCellVertical(_ref2, length) {
    let {
      row,
      col
    } = _ref2;
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
  #placeShipInCellNumber(_ref3, isHorizontal, ship) {
    let {
      row,
      col
    } = _ref3;
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
    this.#shipsPlacement = Array.from({
      length: 10
    }, _ => Array.from({
      length: 10
    }, (_, i) => null));
    this.#ships.forEach(ship => ship.reset());
    this.#board = Array.from({
      length: 10
    }, _ => Array.from({
      length: 10
    }, (_, i) => null));
    this.#randomlyPlaceShips();
  }
}

/***/ }),

/***/ "./src/model/player.js":
/*!*****************************!*\
  !*** ./src/model/player.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {
  #enemyGameBoard;
  #gameBoard;
  constructor(gameBoard, enemyGameBoard) {
    this.#gameBoard = gameBoard;
    this.#enemyGameBoard = enemyGameBoard;
    this.isAttacking = false;
  }
  attack() {
    let coords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    const {
      row,
      col
    } = coords || this.#randomEmptyCell;
    if (!this.#enemyGameBoard.receiveAttack(row, col)) return false;
    return {
      row,
      col
    };
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
    return {
      row,
      col
    };
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
});

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
  reset() {
    this.#hits = 0;
  }
}

/***/ }),

/***/ "./src/view/gameOver.js":
/*!******************************!*\
  !*** ./src/view/gameOver.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ showGameOverMessage)
/* harmony export */ });
function showGameOverMessage(winner, handlePlayAgain) {
  const boardsContainer = document.querySelector(".boards-container");
  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";
  const message = document.createElement("div");
  message.className = "game-over-message";
  message.textContent = `${winner} won!`;
  const playAgainBtn = document.createElement("button");
  playAgainBtn.className = "play-again-btn";
  playAgainBtn.textContent = "PLAY AGAIN";
  playAgainBtn.addEventListener("click", () => {
    messageContainer.remove();
    handlePlayAgain();
  });
  playAgainBtn.onclick = handlePlayAgain;
  messageContainer.insertAdjacentElement("beforeend", message);
  messageContainer.insertAdjacentElement("beforeend", playAgainBtn);
  boardsContainer.insertAdjacentElement("beforeend", messageContainer);
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
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.row = row;
      cellElement.dataset.col = col;
      if (opponentBoard[row][col] === _model_cellState__WEBPACK_IMPORTED_MODULE_0__["default"].hit) {
        cellElement.classList.add("ship-hit-cell");
      } else if (opponentBoard[row][col] === _model_cellState__WEBPACK_IMPORTED_MODULE_0__["default"].miss) {
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
    handleClickOnCell({
      row: +cell.dataset.row,
      col: +cell.dataset.col
    });
  });
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
/* harmony import */ var _model_cellState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/cellState */ "./src/model/cellState.js");

function insertPlayerBoard(shipsPlacementPlayer, hitMissBoardPlayer) {
  const boardElement = document.getElementById("left-board");
  boardElement.innerHTML = "";
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.row = row;
      cellElement.dataset.col = col;
      if (shipsPlacementPlayer[row][col]) {
        if (hitMissBoardPlayer[row][col] === _model_cellState__WEBPACK_IMPORTED_MODULE_0__["default"].hit) {
          cellElement.classList.add("player-hit-ship");
        } else {
          cellElement.classList.add("ship-open-cell");
        }
      } else {
        if (hitMissBoardPlayer[row][col] === _model_cellState__WEBPACK_IMPORTED_MODULE_0__["default"].miss) {
          cellElement.classList.add("player-miss-ship");
        } else {
          cellElement.classList.add("empty-cell");
        }
      }
      boardElement.insertAdjacentElement("beforeend", cellElement);
    }
  }
}

/***/ }),

/***/ "./src/view/insertStartWindow.js":
/*!***************************************!*\
  !*** ./src/view/insertStartWindow.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ insertStartWindow)
/* harmony export */ });
/* harmony import */ var _startView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./startView */ "./src/view/startView.js");

function insertStartWindow(handleStartGame) {
  const startWindow = new _startView__WEBPACK_IMPORTED_MODULE_0__["default"](handleStartGame);
  startWindow.insertStartWindow();
}

/***/ }),

/***/ "./src/view/startView.js":
/*!*******************************!*\
  !*** ./src/view/startView.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StartWindow)
/* harmony export */ });
class StartWindow {
  #handleStartGame;
  #shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  #addedShips = [];
  #placement = Array.from({
    length: 10
  }, _ => Array.from({
    length: 10
  }, (_, i) => false));
  #isHorizontal = true;
  s;
  #rotateBtn = this.#createRotateBtn();
  #resetBtn = this.#createResetBtn();
  #startBtn = this.#createStartBtn();
  #startRandomBtn = this.#createStartRandomBtn();
  #startWindowContainer = this.#createStartWindowContainer();
  #board = this.#createBoard();
  constructor(handleStartGame) {
    this.#handleStartGame = handleStartGame;
    this.#fillBoard();
    document.body.innerHTML = "";
  }
  get #length() {
    return this.#shipLengths[this.#addedShips.length];
  }
  #fillBoard() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cellElement = this.#createEmptyCellElement(row, col);
        cellElement.addEventListener("mouseenter", () => {
          this.#colorNCells(row, col);
        });
        cellElement.addEventListener("mouseleave", () => {
          this.#removeColorNCells(row, col);
        });
        cellElement.addEventListener("click", () => {
          this.#pickCell(row, col);
        });
        this.#board.insertAdjacentElement("beforeend", cellElement);
      }
    }
    this.#startWindowContainer.insertAdjacentElement("beforeend", this.#board);
  }
  #createBoard() {
    const board = document.createElement("div");
    board.id = "board-to-choose-placement";
    board.className = "board";
    return board;
  }
  #createStartWindowContainer() {
    const startWindowContainer = document.createElement("div");
    startWindowContainer.className = "start-window";
    startWindowContainer.insertAdjacentElement("beforeend", this.#rotateBtn);
    startWindowContainer.insertAdjacentElement("beforeend", this.#resetBtn);
    startWindowContainer.insertAdjacentElement("beforeend", this.#startBtn);
    startWindowContainer.insertAdjacentElement("beforeend", this.#startRandomBtn);
    return startWindowContainer;
  }
  #createResetBtn() {
    const resetBtn = document.createElement("button");
    resetBtn.id = "reset-ships-placement-btn";
    resetBtn.className = "start-controls";
    resetBtn.textContent = "RESET";
    resetBtn.addEventListener("click", () => {
      this.#isHorizontal = true;
      this.#placement = Array.from({
        length: 10
      }, _ => Array.from({
        length: 10
      }, (_, i) => false));
      this.#addedShips = [];
      for (const cell of this.#board.children) {
        cell.className = "cell";
      }
    });
    return resetBtn;
  }
  #createStartBtn() {
    const startBtn = document.createElement("button");
    startBtn.id = "start-game-btn";
    startBtn.className = "start-controls";
    startBtn.textContent = "START";
    startBtn.addEventListener("click", () => {
      if (this.#addedShips.length !== this.#shipLengths.length) {
        return;
      }
      this.#startWindowContainer.remove();
      this.#handleStartGame(this.#addedShips);
    });
    return startBtn;
  }
  #createStartRandomBtn() {
    const startBtn = document.createElement("button");
    startBtn.id = "random-start-game-btn";
    startBtn.className = "start-controls";
    startBtn.textContent = "RANDOM";
    startBtn.addEventListener("click", () => {
      this.#startWindowContainer.remove();
      this.#handleStartGame();
    });
    return startBtn;
  }
  #createRotateBtn() {
    const rotateBtn = document.createElement("button");
    rotateBtn.id = "rotate-ship-btn";
    rotateBtn.className = "start-controls";
    rotateBtn.textContent = "ROTATE";
    rotateBtn.addEventListener("click", () => {
      this.#isHorizontal = !this.#isHorizontal;
    });
    return rotateBtn;
  }
  #selectCell(row, col) {
    return this.#board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  }
  #colorNCells(row, col) {
    const start = this.#isHorizontal ? col : row;
    const end = Math.min(10, start + this.#length);
    const canPlace = this.#canPlace(row, col);
    for (let cur = start; cur < end; cur++) {
      const [curRow, curCol] = this.#isHorizontal ? [row, cur] : [cur, col];
      const cellToColor = this.#selectCell(curRow, curCol);
      if (this.#placement[curRow][curCol]) {
        continue;
      }
      cellToColor.classList.remove(`can${canPlace ? "-not" : ""}-place-ship`);
      cellToColor.classList.add(`can${canPlace ? "" : "-not"}-place-ship`);
    }
  }
  #removeColorNCells(row, col) {
    const start = this.#isHorizontal ? col : row;
    const end = Math.min(10, start + this.#length);
    for (let cur = start; cur < end; cur++) {
      const [curRow, curCol] = this.#isHorizontal ? [row, cur] : [cur, col];
      if (this.#placement[curRow][curCol]) {
        continue;
      }
      const cellToColor = this.#board.querySelector(`[data-row="${curRow}"][data-col="${curCol}"]`);
      cellToColor.classList.remove(`can-not-place-ship`, `can-place-ship`);
    }
  }
  #canPlace(row, col) {
    if (this.#addedShips.length === this.#shipLengths.length) return false;
    const start = this.#isHorizontal ? col : row;
    if (start + this.#length > 10) return false;
    const end = Math.min(10, start + this.#length);
    for (let cur = start; cur < end; cur++) {
      const [curRow, curCol] = this.#isHorizontal ? [row, cur] : [cur, col];
      if (this.#placement[curRow][curCol]) {
        return false;
      }
    }
    return true;
  }
  #pickCell(row, col) {
    if (!this.#canPlace(row, col)) return;
    const start = this.#isHorizontal ? col : row;
    const end = Math.min(10, start + this.#length);
    this.#addedShips.push({
      row,
      col,
      isHorizontal: this.#isHorizontal
    });
    for (let cur = start; cur < end; cur++) {
      const [curRow, curCol] = this.#isHorizontal ? [row, cur] : [cur, col];
      this.#placement[curRow][curCol] = true;
      const cellToColor = this.#selectCell(curRow, curCol);
      cellToColor.classList.remove(`can-place-ship`);
      cellToColor.classList.add(`ship-open-cell`);
    }
  }
  #createEmptyCellElement(row, col) {
    const cellElement = document.createElement("div");
    cellElement.className = "cell";
    cellElement.dataset.row = row;
    cellElement.dataset.col = col;
    return cellElement;
  }
  insertStartWindow() {
    document.body.appendChild(this.#startWindowContainer);
  }
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
  const header = document.createElement("h1");
  header.textContent = "Battleship";
  document.body.insertAdjacentElement("beforeend", header);
  document.title = "Battleship";
  const boardsContainer = document.createElement("div");
  boardsContainer.className = "boards-container";
  document.body.insertAdjacentElement("beforeend", boardsContainer);
  const leftPlayerName = document.createElement("div");
  leftPlayerName.className = "left-player-name player-name";
  leftPlayerName.textContent = "Player";
  const rightPlayerName = document.createElement("div");
  rightPlayerName.className = "right-player-name player-name";
  rightPlayerName.textContent = "Computer";
  const leftBoard = document.createElement("div");
  leftBoard.className = "board";
  leftBoard.id = "left-board";
  const rightBoard = document.createElement("div");
  rightBoard.className = "board";
  rightBoard.id = "right-board";
  boardsContainer.insertAdjacentElement("beforeend", leftPlayerName);
  boardsContainer.insertAdjacentElement("beforeend", rightPlayerName);
  boardsContainer.insertAdjacentElement("beforeend", leftBoard);
  boardsContainer.insertAdjacentElement("beforeend", rightBoard);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  font-size: 62.5%;
}

h1 {
  text-align: center;
  font-size: 5rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #e1464fff;
}

.cell {
  width: 3rem;
  height: 3rem;
  background-color: lightblue;
  border: 1px black solid;
}

.empty-cell {
  background-color: lightblue;
}

.ship-open-cell {
  background-color: cadetblue;
}

.ship-hit-cell {
  background-color: #e1464fff;
}

.ship-miss-cell {
  background-color: rgb(244, 255, 28);
}

.player-hit-ship {
  background-color: rgb(122, 37, 41);
}
.player-miss-ship {
  background-color: rgb(244, 255, 28);
}

.cell:hover {
  opacity: 0.7;
}

.board {
  display: grid;
  grid-template-columns: repeat(10, 3rem);
}

.board:hover {
  cursor: pointer;
}

.boards-container {
  display: grid;
  column-gap: 5rem;
  grid-template-columns: 30rem 30rem;
  justify-content: center;
  position: relative;
}

.player-name {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5rem;
}

.message-container {
  position: absolute;
  background-color: white;
  font-size: 3rem;
  padding: 2rem 4rem;
  border-radius: 1rem;

  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;

  top: 50%;
  transform: translateY(-50%);
  width: 20rem;
}

.play-again-btn {
  background-color: #e1464fff;
  color: white;
  font-size: 2.5rem;

  border: none;
  border-radius: 1rem;

  padding: 0.7rem 2rem;

  box-shadow: 0rem 0.7rem 0rem 0rem rgb(77, 115, 138);

  cursor: pointer;
}

.play-again-btn:hover {
  opacity: 0.7;
}

.play-again-btn:active {
  opacity: 1;
  background-color: rgb(144, 43, 48);
  transform: translateY(0.5rem);
  box-shadow: 0rem 0.2rem 0rem 0rem rgb(77, 115, 138);
}

.can-not-place-ship {
  background-color: red;
}

.can-place-ship {
  background-color: green;
}

.start-controls {
  background-color: #e1464fff;
  color: white;
  font-size: 2rem;

  border: none;
  border-radius: 1rem;

  padding: 0.7rem 2rem;

  box-shadow: 0rem 0.7rem 0rem 0rem rgb(77, 115, 138);

  cursor: pointer;
}

.start-controls:hover {
  opacity: 0.7;
}

.start-controls:active {
  opacity: 1;
  background-color: rgb(144, 43, 48);
  transform: translateY(0.5rem);
  box-shadow: 0rem 0.2rem 0rem 0rem rgb(77, 115, 138);
}

.start-window {
  display: grid;
  justify-content: center;
  gap: 2rem;
  grid-template-columns: repeat(2, 15rem);
}
#board-to-choose-placement {
  grid-row-start: 2;
  grid-column-start: 1;
  grid-column-end: 3;
  justify-self: center;
}

#rotate-ship-btn {
  grid-row: 1;
  grid-column: 1;
}

#start-game-btn {
  grid-row: 1;
  grid-column: 2;
}
#reset-ships-placement-btn {
  grid-row: 3;
  grid-column: 1;
}
#random-start-game-btn {
  grid-row: 3;
  grid-column: 2;
}
`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,4DAA4D;EAC5D,gBAAgB;AAClB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,2BAA2B;EAC3B,uBAAuB;AACzB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,kCAAkC;AACpC;AACA;EACE,mCAAmC;AACrC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;EACb,uCAAuC;AACzC;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,gBAAgB;EAChB,kCAAkC;EAClC,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,uBAAuB;EACvB,eAAe;EACf,kBAAkB;EAClB,mBAAmB;;EAEnB,kBAAkB;EAClB,OAAO;EACP,QAAQ;EACR,iBAAiB;EACjB,kBAAkB;;EAElB,QAAQ;EACR,2BAA2B;EAC3B,YAAY;AACd;;AAEA;EACE,2BAA2B;EAC3B,YAAY;EACZ,iBAAiB;;EAEjB,YAAY;EACZ,mBAAmB;;EAEnB,oBAAoB;;EAEpB,mDAAmD;;EAEnD,eAAe;AACjB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;EACV,kCAAkC;EAClC,6BAA6B;EAC7B,mDAAmD;AACrD;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,2BAA2B;EAC3B,YAAY;EACZ,eAAe;;EAEf,YAAY;EACZ,mBAAmB;;EAEnB,oBAAoB;;EAEpB,mDAAmD;;EAEnD,eAAe;AACjB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;EACV,kCAAkC;EAClC,6BAA6B;EAC7B,mDAAmD;AACrD;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,SAAS;EACT,uCAAuC;AACzC;AACA;EACE,iBAAiB;EACjB,oBAAoB;EACpB,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,WAAW;EACX,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,cAAc;AAChB;AACA;EACE,WAAW;EACX,cAAc;AAChB;AACA;EACE,WAAW;EACX,cAAc;AAChB","sourcesContent":[":root {\n  font-size: 62.5%;\n}\n\nh1 {\n  text-align: center;\n  font-size: 5rem;\n  font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif;\n  color: #e1464fff;\n}\n\n.cell {\n  width: 3rem;\n  height: 3rem;\n  background-color: lightblue;\n  border: 1px black solid;\n}\n\n.empty-cell {\n  background-color: lightblue;\n}\n\n.ship-open-cell {\n  background-color: cadetblue;\n}\n\n.ship-hit-cell {\n  background-color: #e1464fff;\n}\n\n.ship-miss-cell {\n  background-color: rgb(244, 255, 28);\n}\n\n.player-hit-ship {\n  background-color: rgb(122, 37, 41);\n}\n.player-miss-ship {\n  background-color: rgb(244, 255, 28);\n}\n\n.cell:hover {\n  opacity: 0.7;\n}\n\n.board {\n  display: grid;\n  grid-template-columns: repeat(10, 3rem);\n}\n\n.board:hover {\n  cursor: pointer;\n}\n\n.boards-container {\n  display: grid;\n  column-gap: 5rem;\n  grid-template-columns: 30rem 30rem;\n  justify-content: center;\n  position: relative;\n}\n\n.player-name {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 2.5rem;\n}\n\n.message-container {\n  position: absolute;\n  background-color: white;\n  font-size: 3rem;\n  padding: 2rem 4rem;\n  border-radius: 1rem;\n\n  position: absolute;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n\n  top: 50%;\n  transform: translateY(-50%);\n  width: 20rem;\n}\n\n.play-again-btn {\n  background-color: #e1464fff;\n  color: white;\n  font-size: 2.5rem;\n\n  border: none;\n  border-radius: 1rem;\n\n  padding: 0.7rem 2rem;\n\n  box-shadow: 0rem 0.7rem 0rem 0rem rgb(77, 115, 138);\n\n  cursor: pointer;\n}\n\n.play-again-btn:hover {\n  opacity: 0.7;\n}\n\n.play-again-btn:active {\n  opacity: 1;\n  background-color: rgb(144, 43, 48);\n  transform: translateY(0.5rem);\n  box-shadow: 0rem 0.2rem 0rem 0rem rgb(77, 115, 138);\n}\n\n.can-not-place-ship {\n  background-color: red;\n}\n\n.can-place-ship {\n  background-color: green;\n}\n\n.start-controls {\n  background-color: #e1464fff;\n  color: white;\n  font-size: 2rem;\n\n  border: none;\n  border-radius: 1rem;\n\n  padding: 0.7rem 2rem;\n\n  box-shadow: 0rem 0.7rem 0rem 0rem rgb(77, 115, 138);\n\n  cursor: pointer;\n}\n\n.start-controls:hover {\n  opacity: 0.7;\n}\n\n.start-controls:active {\n  opacity: 1;\n  background-color: rgb(144, 43, 48);\n  transform: translateY(0.5rem);\n  box-shadow: 0rem 0.2rem 0rem 0rem rgb(77, 115, 138);\n}\n\n.start-window {\n  display: grid;\n  justify-content: center;\n  gap: 2rem;\n  grid-template-columns: repeat(2, 15rem);\n}\n#board-to-choose-placement {\n  grid-row-start: 2;\n  grid-column-start: 1;\n  grid-column-end: 3;\n  justify-self: center;\n}\n\n#rotate-ship-btn {\n  grid-row: 1;\n  grid-column: 1;\n}\n\n#start-game-btn {\n  grid-row: 1;\n  grid-column: 2;\n}\n#reset-ships-placement-btn {\n  grid-row: 3;\n  grid-column: 1;\n}\n#random-start-game-btn {\n  grid-row: 3;\n  grid-column: 2;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/controller.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10aGVvZGlucHJvamVjdC8uL3NyYy9jb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9zcmMvbW9kZWwvY2VsbFN0YXRlLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9zcmMvbW9kZWwvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9zcmMvbW9kZWwvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9zcmMvbW9kZWwvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRoZW9kaW5wcm9qZWN0Ly4vc3JjL3ZpZXcvZ2FtZU92ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10aGVvZGlucHJvamVjdC8uL3NyYy92aWV3L2luc2VydE9wcG9uZW50Qm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10aGVvZGlucHJvamVjdC8uL3NyYy92aWV3L2luc2VydFBsYXllckJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9zcmMvdmlldy9pbnNlcnRTdGFydFdpbmRvdy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRoZW9kaW5wcm9qZWN0Ly4vc3JjL3ZpZXcvc3RhcnRWaWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9zcmMvdmlldy92aWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRoZW9kaW5wcm9qZWN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10aGVvZGlucHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC10aGVvZGlucHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRoZW9kaW5wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtdGhlb2RpbnByb2plY3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLXRoZW9kaW5wcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgXyBmcm9tIFwiLi9zdHlsZS5jc3NcIjtcblxuaW1wb3J0IGNlbGxTdGF0ZSBmcm9tIFwiLi9tb2RlbC9jZWxsU3RhdGVcIjtcbmltcG9ydCBHYW1lQm9hcmQgZnJvbSBcIi4vbW9kZWwvZ2FtZWJvYXJkXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL21vZGVsL3BsYXllclwiO1xuXG5pbXBvcnQgY3JlYXRlU3RhcnRWaWV3IGZyb20gXCIuL3ZpZXcvdmlld1wiO1xuaW1wb3J0IGluc2VydFBsYXllckJvYXJkIGZyb20gXCIuL3ZpZXcvaW5zZXJ0UGxheWVyQm9hcmRcIjtcbmltcG9ydCBpbnNlcnRPcHBvbmVudEJvYXJkIGZyb20gXCIuL3ZpZXcvaW5zZXJ0T3Bwb25lbnRCb2FyZFwiO1xuaW1wb3J0IHNob3dHYW1lT3Zlck1lc3NhZ2UgZnJvbSBcIi4vdmlldy9nYW1lT3ZlclwiO1xuXG5pbXBvcnQgaW5zZXJ0U3RhcnRXaW5kb3cgZnJvbSBcIi4vdmlldy9pbnNlcnRTdGFydFdpbmRvd1wiO1xuXG5jb25zdCB0aW1lciA9IGFzeW5jIGZ1bmN0aW9uIChtcykge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICByZXNvbHZlKCk7XG4gICAgfSwgbXMpXG4gICk7XG59O1xuXG5jb25zdCBtb3ZlQ29tcHV0ZXIgPSBhc3luYyBmdW5jdGlvbiAoY29tcHV0ZXIsIHBsYXllciwgaGFuZGxlR2FtZU92ZXIpIHtcbiAgY29tcHV0ZXIuaXNBdHRhY2tpbmcgPSB0cnVlO1xuICBhd2FpdCB0aW1lcig1MDApO1xuICBsZXQgY29vcmRzID0gY29tcHV0ZXIuYXR0YWNrKCk7XG5cbiAgd2hpbGUgKHBsYXllci5ib2FyZFtjb29yZHMucm93XVtjb29yZHMuY29sXSA9PT0gY2VsbFN0YXRlLmhpdCkge1xuICAgIGluc2VydFBsYXllckJvYXJkKHBsYXllci5zaGlwc1BsYWNlbWVudCwgcGxheWVyLmJvYXJkKTtcbiAgICBpZiAocGxheWVyLmFsbFNoaXBzU3Vuaykge1xuICAgICAgc2hvd0dhbWVPdmVyTWVzc2FnZShcIkNvbXB1dGVyXCIsIGhhbmRsZUdhbWVPdmVyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYXdhaXQgdGltZXIoNTAwKTtcbiAgICBjb29yZHMgPSBjb21wdXRlci5hdHRhY2soKTtcbiAgfVxuXG4gIGluc2VydFBsYXllckJvYXJkKHBsYXllci5zaGlwc1BsYWNlbWVudCwgcGxheWVyLmJvYXJkKTtcbiAgY29tcHV0ZXIuaXNBdHRhY2tpbmcgPSBmYWxzZTtcbiAgaWYgKHBsYXllci5hbGxTaGlwc1N1bmspIHtcbiAgICBzaG93R2FtZU92ZXJNZXNzYWdlKFwiQ29tcHV0ZXJcIiwgaGFuZGxlR2FtZU92ZXIpO1xuICB9XG59O1xuXG5jb25zdCBoYW5kbGVBdHRhY2sgPSBhc3luYyBmdW5jdGlvbiAoXG4gIHBsYXllcixcbiAgY29tcHV0ZXIsXG4gIGhhbmRsZUdhbWVPdmVyLFxuICB7IHJvdywgY29sIH1cbikge1xuICBpZiAocGxheWVyLmFsbFNoaXBzU3VuayB8fCBjb21wdXRlci5hbGxTaGlwc1N1bmsgfHwgY29tcHV0ZXIuaXNBdHRhY2tpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXBsYXllci5hdHRhY2soeyByb3csIGNvbCB9KSkgcmV0dXJuO1xuXG4gIGluc2VydE9wcG9uZW50Qm9hcmQoXG4gICAgY29tcHV0ZXIuYm9hcmQsXG4gICAgaGFuZGxlQXR0YWNrLmJpbmQobnVsbCwgcGxheWVyLCBjb21wdXRlciwgaGFuZGxlR2FtZU92ZXIpXG4gICk7XG5cbiAgaWYgKGNvbXB1dGVyLmFsbFNoaXBzU3Vuaykge1xuICAgIHNob3dHYW1lT3Zlck1lc3NhZ2UoXCJZb3VcIiwgaGFuZGxlR2FtZU92ZXIpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwbGF5ZXJIaXQgPSBjb21wdXRlci5ib2FyZFtyb3ddW2NvbF0gPT09IGNlbGxTdGF0ZS5oaXQ7XG4gIGlmIChwbGF5ZXJIaXQpIHJldHVybjtcblxuICBhd2FpdCBtb3ZlQ29tcHV0ZXIoY29tcHV0ZXIsIHBsYXllciwgaGFuZGxlR2FtZU92ZXIpO1xufTtcblxuY29uc3Qgc3RhcnRHYW1lTG9vcCA9IGZ1bmN0aW9uIChhZGRlZFNoaXBzKSB7XG4gIGNvbnN0IHBsYXllckdhbWVCb2FyZCA9IG5ldyBHYW1lQm9hcmQoYWRkZWRTaGlwcyk7XG4gIGNvbnN0IGNvbXB1dGVyR2FtZUJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuXG4gIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIocGxheWVyR2FtZUJvYXJkLCBjb21wdXRlckdhbWVCb2FyZCk7XG4gIGNvbnN0IGNvbXB1dGVyID0gbmV3IFBsYXllcihjb21wdXRlckdhbWVCb2FyZCwgcGxheWVyR2FtZUJvYXJkKTtcblxuICBjb25zdCBoYW5kbGVQbGF5QWdhaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgaW5zZXJ0U3RhcnRXaW5kb3coc3RhcnRHYW1lTG9vcCk7XG4gIH07XG5cbiAgY3JlYXRlU3RhcnRWaWV3KCk7XG4gIGluc2VydFBsYXllckJvYXJkKHBsYXllci5zaGlwc1BsYWNlbWVudCwgcGxheWVyLmJvYXJkKTtcbiAgaW5zZXJ0T3Bwb25lbnRCb2FyZChcbiAgICBjb21wdXRlci5ib2FyZCxcbiAgICBoYW5kbGVBdHRhY2suYmluZChudWxsLCBwbGF5ZXIsIGNvbXB1dGVyLCBoYW5kbGVQbGF5QWdhaW4pXG4gICk7XG59O1xuXG5pbnNlcnRTdGFydFdpbmRvdyhzdGFydEdhbWVMb29wKTtcbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgbWlzczogXCJNXCIsXG4gIGhpdDogXCJIXCIsXG59O1xuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IGNlbGxTdGF0ZSBmcm9tIFwiLi9jZWxsU3RhdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUJvYXJkIHtcbiAgI3NoaXBzUGxhY2VtZW50ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8pID0+XG4gICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+IG51bGwpXG4gICk7XG5cbiAgI3NoaXBzID0gW1xuICAgIG5ldyBTaGlwKDQpLFxuICAgIG5ldyBTaGlwKDMpLFxuICAgIG5ldyBTaGlwKDMpLFxuICAgIG5ldyBTaGlwKDIpLFxuICAgIG5ldyBTaGlwKDIpLFxuICAgIG5ldyBTaGlwKDIpLFxuICAgIG5ldyBTaGlwKDEpLFxuICAgIG5ldyBTaGlwKDEpLFxuICAgIG5ldyBTaGlwKDEpLFxuICAgIG5ldyBTaGlwKDEpLFxuICBdO1xuXG4gICNib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfKSA9PlxuICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfLCBpKSA9PiBudWxsKVxuICApO1xuXG4gIGNvbnN0cnVjdG9yKGFkZGVkU2hpcHMpIHtcbiAgICBpZiAoIWFkZGVkU2hpcHMpIHtcbiAgICAgIHRoaXMuI3JhbmRvbWx5UGxhY2VTaGlwcygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGNvbnN0IHsgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCB9ID0gYWRkZWRTaGlwc1tpXTtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLiNzaGlwc1tpXTtcbiAgICAgIHRoaXMuI3BsYWNlU2hpcEluQ2VsbE51bWJlcih7IHJvdywgY29sIH0sIGlzSG9yaXpvbnRhbCwgc2hpcCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHNoaXBzUGxhY2VtZW50KCkge1xuICAgIGNvbnN0IGNvcHlPZlNoaXBQbGFjZW1lbnQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLiNzaGlwc1BsYWNlbWVudCkge1xuICAgICAgY29weU9mU2hpcFBsYWNlbWVudC5wdXNoKHJvdy5tYXAoKGNlbGwpID0+IGNlbGwgIT09IG51bGwpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvcHlPZlNoaXBQbGFjZW1lbnQ7XG4gIH1cblxuICBnZXQgYm9hcmQoKSB7XG4gICAgY29uc3QgY29weU9mQm9hcmQgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHJvdyBvZiB0aGlzLiNib2FyZCkge1xuICAgICAgY29weU9mQm9hcmQucHVzaChbLi4ucm93XSk7XG4gICAgfVxuICAgIHJldHVybiBjb3B5T2ZCb2FyZDtcbiAgfVxuXG4gIGdldCBhbGxTaGlwc1N1bmsoKSB7XG4gICAgZm9yIChjb25zdCBzaGlwIG9mIHRoaXMuI3NoaXBzKSB7XG4gICAgICBpZiAoIXNoaXAuaXNTdW5rKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbCkge1xuICAgIGlmICh0aGlzLiNib2FyZFtyb3ddW2NvbF0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy4jc2hpcHNQbGFjZW1lbnRbcm93XVtjb2xdKSB7XG4gICAgICB0aGlzLiNzaGlwc1BsYWNlbWVudFtyb3ddW2NvbF0uaGl0KCk7XG4gICAgICB0aGlzLiNib2FyZFtyb3ddW2NvbF0gPSBjZWxsU3RhdGUuaGl0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLiNib2FyZFtyb3ddW2NvbF0gPSBjZWxsU3RhdGUubWlzcztcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAjcmFuZEludEZyb20wVG9NYXgobWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSAxKSk7XG4gIH1cblxuICBnZXQgI3JhbmRvbUJvb2xlYW4oKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPCAwLjU7XG4gIH1cblxuICAjZ2V0Q29vcmRzT2ZOdGhGcmVlQ2VsbEluU2hpcHNQbGFjZW1lbnQobikge1xuICAgIGxldCBjdXJyZW50RnJlZUNlbGxOdW1iZXIgPSAtMTtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDEwOyBjb2wrKykge1xuICAgICAgICBpZiAoIXRoaXMuI3NoaXBzUGxhY2VtZW50W3Jvd11bY29sXSkge1xuICAgICAgICAgIGN1cnJlbnRGcmVlQ2VsbE51bWJlcisrO1xuICAgICAgICAgIGlmIChjdXJyZW50RnJlZUNlbGxOdW1iZXIgPT09IG4pIHtcbiAgICAgICAgICAgIHJldHVybiB7IHJvdywgY29sIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgI3JhbmRvbWx5UGxhY2VTaGlwcygpIHtcbiAgICBsZXQgcmVtYWluaW5nQ2VsbHMgPSAxMDA7XG5cbiAgICBmb3IgKGNvbnN0IHNoaXAgb2YgdGhpcy4jc2hpcHMpIHtcbiAgICAgIGxldCBmcmVlQ2VsbE51bWJlciA9IHRoaXMuI3JhbmRJbnRGcm9tMFRvTWF4KHJlbWFpbmluZ0NlbGxzIC0gMSk7XG4gICAgICBjb25zdCBpc0hvcml6b250YWwgPSB0aGlzLiNyYW5kb21Cb29sZWFuO1xuXG4gICAgICBsZXQgY29vcmRzID0gdGhpcy4jZ2V0Q29vcmRzT2ZOdGhGcmVlQ2VsbEluU2hpcHNQbGFjZW1lbnQoZnJlZUNlbGxOdW1iZXIpO1xuXG4gICAgICB3aGlsZSAoIXRoaXMuI2NhblBsYWNlU2hpcEluQ2VsbChjb29yZHMsIGlzSG9yaXpvbnRhbCwgc2hpcC5sZW5ndGgpKSB7XG4gICAgICAgIGZyZWVDZWxsTnVtYmVyID0gKGZyZWVDZWxsTnVtYmVyICsgMSkgJSByZW1haW5pbmdDZWxscztcbiAgICAgICAgY29vcmRzID0gdGhpcy4jZ2V0Q29vcmRzT2ZOdGhGcmVlQ2VsbEluU2hpcHNQbGFjZW1lbnQoZnJlZUNlbGxOdW1iZXIpO1xuICAgICAgfVxuICAgICAgdGhpcy4jcGxhY2VTaGlwSW5DZWxsTnVtYmVyKGNvb3JkcywgaXNIb3Jpem9udGFsLCBzaGlwKTtcblxuICAgICAgcmVtYWluaW5nQ2VsbHMgLT0gc2hpcC5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgI2NhblBsYWNlU2hpcEluQ2VsbChjb29yZHMsIGlzSG9yaXpvbnRhbCwgbGVuZ3RoKSB7XG4gICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuI2NhblBsYWNlU2hpcEluQ2VsbEhvcml6b250YWwoY29vcmRzLCBsZW5ndGgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy4jY2FuUGxhY2VTaGlwSW5DZWxsVmVydGljYWwoY29vcmRzLCBsZW5ndGgpO1xuICB9XG5cbiAgI2NhblBsYWNlU2hpcEluQ2VsbEhvcml6b250YWwoeyByb3csIGNvbCB9LCBsZW5ndGgpIHtcbiAgICBjb25zdCBsZW5ndGhFeGNlZWRzQm9yZGVyID0gY29sICsgbGVuZ3RoID4gMTA7XG5cbiAgICBjb25zdCBsZWZ0RW5kQ29sID0gTWF0aC5tYXgoY29sIC0gMSwgMCk7XG4gICAgY29uc3QgbGVmdEVuZE5vdEZyZWUgPSB0aGlzLiNzaGlwc1BsYWNlbWVudFtyb3ddW2xlZnRFbmRDb2xdO1xuXG4gICAgY29uc3QgcmlnaHRFbmRDb2wgPSBNYXRoLm1pbihjb2wgKyBsZW5ndGgsIDkpO1xuICAgIGNvbnN0IHJpZ2h0RW5kTm90RnJlZSA9IHRoaXMuI3NoaXBzUGxhY2VtZW50W3Jvd11bcmlnaHRFbmRDb2xdO1xuXG4gICAgaWYgKGxlbmd0aEV4Y2VlZHNCb3JkZXIgfHwgbGVmdEVuZE5vdEZyZWUgfHwgcmlnaHRFbmROb3RGcmVlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgY3VyQ29sID0gY29sOyBjdXJDb2wgPCBjb2wgKyBsZW5ndGg7IGN1ckNvbCsrKSB7XG4gICAgICBjb25zdCBjZWxsTm90RnJlZSA9IHRoaXMuI3NoaXBzUGxhY2VtZW50W3Jvd11bY3VyQ29sXTtcblxuICAgICAgY29uc3QgdG9wU2lkZVJvdyA9IE1hdGgubWF4KHJvdyAtIDEsIDApO1xuICAgICAgY29uc3QgdG9wU2lkZU5vdEZyZWUgPSB0aGlzLiNzaGlwc1BsYWNlbWVudFt0b3BTaWRlUm93XVtjdXJDb2xdO1xuXG4gICAgICBjb25zdCBib3R0b21TaWRlUm93ID0gTWF0aC5taW4ocm93ICsgMSwgOSk7XG4gICAgICBjb25zdCBib3R0b21TaWRlTm90RnJlZSA9IHRoaXMuI3NoaXBzUGxhY2VtZW50W2JvdHRvbVNpZGVSb3ddW2N1ckNvbF07XG5cbiAgICAgIGlmIChjZWxsTm90RnJlZSB8fCB0b3BTaWRlTm90RnJlZSB8fCBib3R0b21TaWRlTm90RnJlZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgI2NhblBsYWNlU2hpcEluQ2VsbFZlcnRpY2FsKHsgcm93LCBjb2wgfSwgbGVuZ3RoKSB7XG4gICAgY29uc3QgbGVuZ3RoRXhjZWVkc0JvcmRlciA9IHJvdyArIGxlbmd0aCA+IDEwO1xuXG4gICAgY29uc3QgdG9wUm93ID0gTWF0aC5tYXgocm93IC0gMSwgMCk7XG4gICAgY29uc3QgdG9wRW5kTm90RnJlZSA9IHRoaXMuI3NoaXBzUGxhY2VtZW50W3RvcFJvd11bY29sXTtcblxuICAgIGNvbnN0IGJvdHRvbVJvdyA9IE1hdGgubWluKHJvdyArIGxlbmd0aCwgOSk7XG4gICAgY29uc3QgYm90dG9tRW5kTm90RnJlZSA9IHRoaXMuI3NoaXBzUGxhY2VtZW50W2JvdHRvbVJvd11bY29sXTtcblxuICAgIGlmIChsZW5ndGhFeGNlZWRzQm9yZGVyIHx8IHRvcEVuZE5vdEZyZWUgfHwgYm90dG9tRW5kTm90RnJlZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IGN1clJvdyA9IHJvdzsgY3VyUm93IDwgcm93ICsgbGVuZ3RoOyBjdXJSb3crKykge1xuICAgICAgY29uc3QgY2VsbE5vdEZyZWUgPSB0aGlzLiNzaGlwc1BsYWNlbWVudFtjdXJSb3ddW2NvbF07XG5cbiAgICAgIGNvbnN0IGxlZnRDb2wgPSBNYXRoLm1heChjb2wgLSAxLCAwKTtcbiAgICAgIGNvbnN0IGxlZnRTaWRlTm90RnJlZSA9IHRoaXMuI3NoaXBzUGxhY2VtZW50W2N1clJvd11bbGVmdENvbF07XG5cbiAgICAgIGNvbnN0IHJpZ2h0Q29sID0gTWF0aC5taW4oY29sICsgMSwgOSk7XG4gICAgICBjb25zdCByaWdodFNpZGVOb3RGcmVlID0gdGhpcy4jc2hpcHNQbGFjZW1lbnRbY3VyUm93XVtyaWdodENvbF07XG5cbiAgICAgIGlmIChjZWxsTm90RnJlZSB8fCBsZWZ0U2lkZU5vdEZyZWUgfHwgcmlnaHRTaWRlTm90RnJlZSkgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gICNwbGFjZVNoaXBJbkNlbGxOdW1iZXIoeyByb3csIGNvbCB9LCBpc0hvcml6b250YWwsIHNoaXApIHtcbiAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICBmb3IgKGxldCBjdXJDb2wgPSBjb2w7IGN1ckNvbCA8IGNvbCArIHNoaXAubGVuZ3RoOyBjdXJDb2wrKykge1xuICAgICAgICB0aGlzLiNzaGlwc1BsYWNlbWVudFtyb3ddW2N1ckNvbF0gPSBzaGlwO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3IgKGxldCBjdXJSb3cgPSByb3c7IGN1clJvdyA8IHJvdyArIHNoaXAubGVuZ3RoOyBjdXJSb3crKykge1xuICAgICAgdGhpcy4jc2hpcHNQbGFjZW1lbnRbY3VyUm93XVtjb2xdID0gc2hpcDtcbiAgICB9XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLiNzaGlwc1BsYWNlbWVudCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfKSA9PlxuICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+IG51bGwpXG4gICAgKTtcblxuICAgIHRoaXMuI3NoaXBzLmZvckVhY2goKHNoaXApID0+IHNoaXAucmVzZXQoKSk7XG5cbiAgICB0aGlzLiNib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfKSA9PlxuICAgICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+IG51bGwpXG4gICAgKTtcblxuICAgIHRoaXMuI3JhbmRvbWx5UGxhY2VTaGlwcygpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICNlbmVteUdhbWVCb2FyZDtcbiAgI2dhbWVCb2FyZDtcblxuICBjb25zdHJ1Y3RvcihnYW1lQm9hcmQsIGVuZW15R2FtZUJvYXJkKSB7XG4gICAgdGhpcy4jZ2FtZUJvYXJkID0gZ2FtZUJvYXJkO1xuICAgIHRoaXMuI2VuZW15R2FtZUJvYXJkID0gZW5lbXlHYW1lQm9hcmQ7XG4gICAgdGhpcy5pc0F0dGFja2luZyA9IGZhbHNlO1xuICB9XG5cbiAgYXR0YWNrKGNvb3JkcyA9IG51bGwpIHtcbiAgICBjb25zdCB7IHJvdywgY29sIH0gPSBjb29yZHMgfHwgdGhpcy4jcmFuZG9tRW1wdHlDZWxsO1xuICAgIGlmICghdGhpcy4jZW5lbXlHYW1lQm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCkpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB7IHJvdywgY29sIH07XG4gIH1cblxuICBnZXQgI3JhbmRvbUVtcHR5Q2VsbCgpIHtcbiAgICBjb25zdCBlbXB0eUNlbGxzID0gW107XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCAxMDsgY29sKyspIHtcbiAgICAgICAgaWYgKCF0aGlzLiNlbmVteUdhbWVCb2FyZC5ib2FyZFtyb3ddW2NvbF0pIHtcbiAgICAgICAgICBlbXB0eUNlbGxzLnB1c2goW3JvdywgY29sXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoZW1wdHlDZWxscy5sZW5ndGggLSAxKSk7XG4gICAgY29uc3QgW3JvdywgY29sXSA9IGVtcHR5Q2VsbHNbcmFuZG9tSW5kZXhdO1xuICAgIHJldHVybiB7IHJvdywgY29sIH07XG4gIH1cblxuICBnZXQgYm9hcmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuI2dhbWVCb2FyZC5ib2FyZDtcbiAgfVxuXG4gIGdldCBzaGlwc1BsYWNlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy4jZ2FtZUJvYXJkLnNoaXBzUGxhY2VtZW50O1xuICB9XG5cbiAgZ2V0IGFsbFNoaXBzU3VuaygpIHtcbiAgICByZXR1cm4gdGhpcy4jZ2FtZUJvYXJkLmFsbFNoaXBzU3VuaztcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuI2dhbWVCb2FyZC5yZXNldCgpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTaGlwIHtcbiAgI2xlbmd0aDtcbiAgI2hpdHMgPSAwO1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLiNsZW5ndGggPSBsZW5ndGg7XG4gIH1cblxuICBnZXQgaXNTdW5rKCkge1xuICAgIHJldHVybiB0aGlzLiNsZW5ndGggPT09IHRoaXMuI2hpdHM7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLiNsZW5ndGg7XG4gIH1cblxuICBnZXQgaGl0cygpIHtcbiAgICByZXR1cm4gdGhpcy4jaGl0cztcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICBpZiAodGhpcy5pc1N1bmspIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy4jaGl0cysrO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy4jaGl0cyA9IDA7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNob3dHYW1lT3Zlck1lc3NhZ2Uod2lubmVyLCBoYW5kbGVQbGF5QWdhaW4pIHtcbiAgY29uc3QgYm9hcmRzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ib2FyZHMtY29udGFpbmVyXCIpO1xuXG4gIGNvbnN0IG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBtZXNzYWdlQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwibWVzc2FnZS1jb250YWluZXJcIjtcblxuICBjb25zdCBtZXNzYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbWVzc2FnZS5jbGFzc05hbWUgPSBcImdhbWUtb3Zlci1tZXNzYWdlXCI7XG4gIG1lc3NhZ2UudGV4dENvbnRlbnQgPSBgJHt3aW5uZXJ9IHdvbiFgO1xuXG4gIGNvbnN0IHBsYXlBZ2FpbkJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIHBsYXlBZ2FpbkJ0bi5jbGFzc05hbWUgPSBcInBsYXktYWdhaW4tYnRuXCI7XG4gIHBsYXlBZ2FpbkJ0bi50ZXh0Q29udGVudCA9IFwiUExBWSBBR0FJTlwiO1xuXG4gIHBsYXlBZ2FpbkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIG1lc3NhZ2VDb250YWluZXIucmVtb3ZlKCk7XG4gICAgaGFuZGxlUGxheUFnYWluKCk7XG4gIH0pO1xuXG4gIHBsYXlBZ2FpbkJ0bi5vbmNsaWNrID0gaGFuZGxlUGxheUFnYWluO1xuXG4gIG1lc3NhZ2VDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIG1lc3NhZ2UpO1xuICBtZXNzYWdlQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBwbGF5QWdhaW5CdG4pO1xuXG4gIGJvYXJkc0NvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgbWVzc2FnZUNvbnRhaW5lcik7XG59XG4iLCJpbXBvcnQgY2VsbFN0YXRlIGZyb20gXCIuLi9tb2RlbC9jZWxsU3RhdGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5zZXJ0UGxheWVyQm9hcmQob3Bwb25lbnRCb2FyZCwgaGFuZGxlQ2xpY2tPbkNlbGwpIHtcbiAgY29uc3QgYm9hcmRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodC1ib2FyZFwiKTtcbiAgYm9hcmRFbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG5cbiAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XG4gICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgMTA7IGNvbCsrKSB7XG4gICAgICBjb25zdCBjZWxsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICBjZWxsRWxlbWVudC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgIGNlbGxFbGVtZW50LmRhdGFzZXQucm93ID0gcm93O1xuICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5jb2wgPSBjb2w7XG5cbiAgICAgIGlmIChvcHBvbmVudEJvYXJkW3Jvd11bY29sXSA9PT0gY2VsbFN0YXRlLmhpdCkge1xuICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwic2hpcC1oaXQtY2VsbFwiKTtcbiAgICAgIH0gZWxzZSBpZiAob3Bwb25lbnRCb2FyZFtyb3ddW2NvbF0gPT09IGNlbGxTdGF0ZS5taXNzKSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzaGlwLW1pc3MtY2VsbFwiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlbXB0eS1jZWxsXCIpO1xuICAgICAgfVxuXG4gICAgICBib2FyZEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGNlbGxFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBib2FyZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIGNvbnN0IGNlbGwgPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5jZWxsXCIpO1xuICAgIGlmICghY2VsbCkgcmV0dXJuO1xuXG4gICAgaGFuZGxlQ2xpY2tPbkNlbGwoe1xuICAgICAgcm93OiArY2VsbC5kYXRhc2V0LnJvdyxcbiAgICAgIGNvbDogK2NlbGwuZGF0YXNldC5jb2wsXG4gICAgfSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IGNlbGxTdGF0ZSBmcm9tIFwiLi4vbW9kZWwvY2VsbFN0YXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluc2VydFBsYXllckJvYXJkKFxuICBzaGlwc1BsYWNlbWVudFBsYXllcixcbiAgaGl0TWlzc0JvYXJkUGxheWVyXG4pIHtcbiAgY29uc3QgYm9hcmRFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWZ0LWJvYXJkXCIpO1xuICBib2FyZEVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcblxuICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCAxMDsgY29sKyspIHtcbiAgICAgIGNvbnN0IGNlbGxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGNlbGxFbGVtZW50LmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgICAgY2VsbEVsZW1lbnQuZGF0YXNldC5yb3cgPSByb3c7XG4gICAgICBjZWxsRWxlbWVudC5kYXRhc2V0LmNvbCA9IGNvbDtcblxuICAgICAgaWYgKHNoaXBzUGxhY2VtZW50UGxheWVyW3Jvd11bY29sXSkge1xuICAgICAgICBpZiAoaGl0TWlzc0JvYXJkUGxheWVyW3Jvd11bY29sXSA9PT0gY2VsbFN0YXRlLmhpdCkge1xuICAgICAgICAgIGNlbGxFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXItaGl0LXNoaXBcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2VsbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNoaXAtb3Blbi1jZWxsXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaGl0TWlzc0JvYXJkUGxheWVyW3Jvd11bY29sXSA9PT0gY2VsbFN0YXRlLm1pc3MpIHtcbiAgICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGxheWVyLW1pc3Mtc2hpcFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjZWxsRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZW1wdHktY2VsbFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBib2FyZEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGNlbGxFbGVtZW50KTtcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBTdGFydFdpbmRvdyBmcm9tIFwiLi9zdGFydFZpZXdcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaW5zZXJ0U3RhcnRXaW5kb3coaGFuZGxlU3RhcnRHYW1lKSB7XG4gIGNvbnN0IHN0YXJ0V2luZG93ID0gbmV3IFN0YXJ0V2luZG93KGhhbmRsZVN0YXJ0R2FtZSk7XG4gIHN0YXJ0V2luZG93Lmluc2VydFN0YXJ0V2luZG93KCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFydFdpbmRvdyB7XG4gICNoYW5kbGVTdGFydEdhbWU7XG4gICNzaGlwTGVuZ3RocyA9IFs0LCAzLCAzLCAyLCAyLCAyLCAxLCAxLCAxLCAxXTtcblxuICAjYWRkZWRTaGlwcyA9IFtdO1xuICAjcGxhY2VtZW50ID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8pID0+XG4gICAgQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKF8sIGkpID0+IGZhbHNlKVxuICApO1xuXG4gICNpc0hvcml6b250YWwgPSB0cnVlO1xuICBzO1xuICAjcm90YXRlQnRuID0gdGhpcy4jY3JlYXRlUm90YXRlQnRuKCk7XG4gICNyZXNldEJ0biA9IHRoaXMuI2NyZWF0ZVJlc2V0QnRuKCk7XG4gICNzdGFydEJ0biA9IHRoaXMuI2NyZWF0ZVN0YXJ0QnRuKCk7XG4gICNzdGFydFJhbmRvbUJ0biA9IHRoaXMuI2NyZWF0ZVN0YXJ0UmFuZG9tQnRuKCk7XG5cbiAgI3N0YXJ0V2luZG93Q29udGFpbmVyID0gdGhpcy4jY3JlYXRlU3RhcnRXaW5kb3dDb250YWluZXIoKTtcbiAgI2JvYXJkID0gdGhpcy4jY3JlYXRlQm9hcmQoKTtcblxuICBjb25zdHJ1Y3RvcihoYW5kbGVTdGFydEdhbWUpIHtcbiAgICB0aGlzLiNoYW5kbGVTdGFydEdhbWUgPSBoYW5kbGVTdGFydEdhbWU7XG4gICAgdGhpcy4jZmlsbEJvYXJkKCk7XG4gICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgPSBcIlwiO1xuICB9XG5cbiAgZ2V0ICNsZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3NoaXBMZW5ndGhzW3RoaXMuI2FkZGVkU2hpcHMubGVuZ3RoXTtcbiAgfVxuXG4gICNmaWxsQm9hcmQoKSB7XG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCAxMDsgY29sKyspIHtcbiAgICAgICAgY29uc3QgY2VsbEVsZW1lbnQgPSB0aGlzLiNjcmVhdGVFbXB0eUNlbGxFbGVtZW50KHJvdywgY29sKTtcblxuICAgICAgICBjZWxsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy4jY29sb3JOQ2VsbHMocm93LCBjb2wpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy4jcmVtb3ZlQ29sb3JOQ2VsbHMocm93LCBjb2wpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjZWxsRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuI3BpY2tDZWxsKHJvdywgY29sKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4jYm9hcmQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGNlbGxFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy4jc3RhcnRXaW5kb3dDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHRoaXMuI2JvYXJkKTtcbiAgfVxuXG4gICNjcmVhdGVCb2FyZCgpIHtcbiAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYm9hcmQuaWQgPSBcImJvYXJkLXRvLWNob29zZS1wbGFjZW1lbnRcIjtcbiAgICBib2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XG5cbiAgICByZXR1cm4gYm9hcmQ7XG4gIH1cblxuICAjY3JlYXRlU3RhcnRXaW5kb3dDb250YWluZXIoKSB7XG4gICAgY29uc3Qgc3RhcnRXaW5kb3dDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHN0YXJ0V2luZG93Q29udGFpbmVyLmNsYXNzTmFtZSA9IFwic3RhcnQtd2luZG93XCI7XG5cbiAgICBzdGFydFdpbmRvd0NvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGhpcy4jcm90YXRlQnRuKTtcbiAgICBzdGFydFdpbmRvd0NvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgdGhpcy4jcmVzZXRCdG4pO1xuICAgIHN0YXJ0V2luZG93Q29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCB0aGlzLiNzdGFydEJ0bik7XG4gICAgc3RhcnRXaW5kb3dDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxuICAgICAgXCJiZWZvcmVlbmRcIixcbiAgICAgIHRoaXMuI3N0YXJ0UmFuZG9tQnRuXG4gICAgKTtcblxuICAgIHJldHVybiBzdGFydFdpbmRvd0NvbnRhaW5lcjtcbiAgfVxuXG4gICNjcmVhdGVSZXNldEJ0bigpIHtcbiAgICBjb25zdCByZXNldEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgcmVzZXRCdG4uaWQgPSBcInJlc2V0LXNoaXBzLXBsYWNlbWVudC1idG5cIjtcbiAgICByZXNldEJ0bi5jbGFzc05hbWUgPSBcInN0YXJ0LWNvbnRyb2xzXCI7XG4gICAgcmVzZXRCdG4udGV4dENvbnRlbnQgPSBcIlJFU0VUXCI7XG5cbiAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy4jaXNIb3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgIHRoaXMuI3BsYWNlbWVudCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sIChfKSA9PlxuICAgICAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCAoXywgaSkgPT4gZmFsc2UpXG4gICAgICApO1xuICAgICAgdGhpcy4jYWRkZWRTaGlwcyA9IFtdO1xuXG4gICAgICBmb3IgKGNvbnN0IGNlbGwgb2YgdGhpcy4jYm9hcmQuY2hpbGRyZW4pIHtcbiAgICAgICAgY2VsbC5jbGFzc05hbWUgPSBcImNlbGxcIjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZXNldEJ0bjtcbiAgfVxuXG4gICNjcmVhdGVTdGFydEJ0bigpIHtcbiAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgc3RhcnRCdG4uaWQgPSBcInN0YXJ0LWdhbWUtYnRuXCI7XG4gICAgc3RhcnRCdG4uY2xhc3NOYW1lID0gXCJzdGFydC1jb250cm9sc1wiO1xuICAgIHN0YXJ0QnRuLnRleHRDb250ZW50ID0gXCJTVEFSVFwiO1xuXG4gICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmICh0aGlzLiNhZGRlZFNoaXBzLmxlbmd0aCAhPT0gdGhpcy4jc2hpcExlbmd0aHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuI3N0YXJ0V2luZG93Q29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgdGhpcy4jaGFuZGxlU3RhcnRHYW1lKHRoaXMuI2FkZGVkU2hpcHMpO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN0YXJ0QnRuO1xuICB9XG5cbiAgI2NyZWF0ZVN0YXJ0UmFuZG9tQnRuKCkge1xuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICBzdGFydEJ0bi5pZCA9IFwicmFuZG9tLXN0YXJ0LWdhbWUtYnRuXCI7XG4gICAgc3RhcnRCdG4uY2xhc3NOYW1lID0gXCJzdGFydC1jb250cm9sc1wiO1xuICAgIHN0YXJ0QnRuLnRleHRDb250ZW50ID0gXCJSQU5ET01cIjtcblxuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLiNzdGFydFdpbmRvd0NvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgIHRoaXMuI2hhbmRsZVN0YXJ0R2FtZSgpO1xuICAgIH0pO1xuICAgIHJldHVybiBzdGFydEJ0bjtcbiAgfVxuXG4gICNjcmVhdGVSb3RhdGVCdG4oKSB7XG4gICAgY29uc3Qgcm90YXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICByb3RhdGVCdG4uaWQgPSBcInJvdGF0ZS1zaGlwLWJ0blwiO1xuICAgIHJvdGF0ZUJ0bi5jbGFzc05hbWUgPSBcInN0YXJ0LWNvbnRyb2xzXCI7XG4gICAgcm90YXRlQnRuLnRleHRDb250ZW50ID0gXCJST1RBVEVcIjtcblxuICAgIHJvdGF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy4jaXNIb3Jpem9udGFsID0gIXRoaXMuI2lzSG9yaXpvbnRhbDtcbiAgICB9KTtcbiAgICByZXR1cm4gcm90YXRlQnRuO1xuICB9XG5cbiAgI3NlbGVjdENlbGwocm93LCBjb2wpIHtcbiAgICByZXR1cm4gdGhpcy4jYm9hcmQucXVlcnlTZWxlY3RvcihgW2RhdGEtcm93PVwiJHtyb3d9XCJdW2RhdGEtY29sPVwiJHtjb2x9XCJdYCk7XG4gIH1cblxuICAjY29sb3JOQ2VsbHMocm93LCBjb2wpIHtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuI2lzSG9yaXpvbnRhbCA/IGNvbCA6IHJvdztcbiAgICBjb25zdCBlbmQgPSBNYXRoLm1pbigxMCwgc3RhcnQgKyB0aGlzLiNsZW5ndGgpO1xuXG4gICAgY29uc3QgY2FuUGxhY2UgPSB0aGlzLiNjYW5QbGFjZShyb3csIGNvbCk7XG5cbiAgICBmb3IgKGxldCBjdXIgPSBzdGFydDsgY3VyIDwgZW5kOyBjdXIrKykge1xuICAgICAgY29uc3QgW2N1clJvdywgY3VyQ29sXSA9IHRoaXMuI2lzSG9yaXpvbnRhbCA/IFtyb3csIGN1cl0gOiBbY3VyLCBjb2xdO1xuXG4gICAgICBjb25zdCBjZWxsVG9Db2xvciA9IHRoaXMuI3NlbGVjdENlbGwoY3VyUm93LCBjdXJDb2wpO1xuICAgICAgaWYgKHRoaXMuI3BsYWNlbWVudFtjdXJSb3ddW2N1ckNvbF0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjZWxsVG9Db2xvci5jbGFzc0xpc3QucmVtb3ZlKGBjYW4ke2NhblBsYWNlID8gXCItbm90XCIgOiBcIlwifS1wbGFjZS1zaGlwYCk7XG5cbiAgICAgIGNlbGxUb0NvbG9yLmNsYXNzTGlzdC5hZGQoYGNhbiR7Y2FuUGxhY2UgPyBcIlwiIDogXCItbm90XCJ9LXBsYWNlLXNoaXBgKTtcbiAgICB9XG4gIH1cblxuICAjcmVtb3ZlQ29sb3JOQ2VsbHMocm93LCBjb2wpIHtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMuI2lzSG9yaXpvbnRhbCA/IGNvbCA6IHJvdztcbiAgICBjb25zdCBlbmQgPSBNYXRoLm1pbigxMCwgc3RhcnQgKyB0aGlzLiNsZW5ndGgpO1xuXG4gICAgZm9yIChsZXQgY3VyID0gc3RhcnQ7IGN1ciA8IGVuZDsgY3VyKyspIHtcbiAgICAgIGNvbnN0IFtjdXJSb3csIGN1ckNvbF0gPSB0aGlzLiNpc0hvcml6b250YWwgPyBbcm93LCBjdXJdIDogW2N1ciwgY29sXTtcbiAgICAgIGlmICh0aGlzLiNwbGFjZW1lbnRbY3VyUm93XVtjdXJDb2xdKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgY2VsbFRvQ29sb3IgPSB0aGlzLiNib2FyZC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICBgW2RhdGEtcm93PVwiJHtjdXJSb3d9XCJdW2RhdGEtY29sPVwiJHtjdXJDb2x9XCJdYFxuICAgICAgKTtcblxuICAgICAgY2VsbFRvQ29sb3IuY2xhc3NMaXN0LnJlbW92ZShgY2FuLW5vdC1wbGFjZS1zaGlwYCwgYGNhbi1wbGFjZS1zaGlwYCk7XG4gICAgfVxuICB9XG5cbiAgI2NhblBsYWNlKHJvdywgY29sKSB7XG4gICAgaWYgKHRoaXMuI2FkZGVkU2hpcHMubGVuZ3RoID09PSB0aGlzLiNzaGlwTGVuZ3Rocy5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy4jaXNIb3Jpem9udGFsID8gY29sIDogcm93O1xuXG4gICAgaWYgKHN0YXJ0ICsgdGhpcy4jbGVuZ3RoID4gMTApIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKDEwLCBzdGFydCArIHRoaXMuI2xlbmd0aCk7XG5cbiAgICBmb3IgKGxldCBjdXIgPSBzdGFydDsgY3VyIDwgZW5kOyBjdXIrKykge1xuICAgICAgY29uc3QgW2N1clJvdywgY3VyQ29sXSA9IHRoaXMuI2lzSG9yaXpvbnRhbCA/IFtyb3csIGN1cl0gOiBbY3VyLCBjb2xdO1xuXG4gICAgICBpZiAodGhpcy4jcGxhY2VtZW50W2N1clJvd11bY3VyQ29sXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgI3BpY2tDZWxsKHJvdywgY29sKSB7XG4gICAgaWYgKCF0aGlzLiNjYW5QbGFjZShyb3csIGNvbCkpIHJldHVybjtcblxuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy4jaXNIb3Jpem9udGFsID8gY29sIDogcm93O1xuICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKDEwLCBzdGFydCArIHRoaXMuI2xlbmd0aCk7XG5cbiAgICB0aGlzLiNhZGRlZFNoaXBzLnB1c2goeyByb3csIGNvbCwgaXNIb3Jpem9udGFsOiB0aGlzLiNpc0hvcml6b250YWwgfSk7XG5cbiAgICBmb3IgKGxldCBjdXIgPSBzdGFydDsgY3VyIDwgZW5kOyBjdXIrKykge1xuICAgICAgY29uc3QgW2N1clJvdywgY3VyQ29sXSA9IHRoaXMuI2lzSG9yaXpvbnRhbCA/IFtyb3csIGN1cl0gOiBbY3VyLCBjb2xdO1xuXG4gICAgICB0aGlzLiNwbGFjZW1lbnRbY3VyUm93XVtjdXJDb2xdID0gdHJ1ZTtcblxuICAgICAgY29uc3QgY2VsbFRvQ29sb3IgPSB0aGlzLiNzZWxlY3RDZWxsKGN1clJvdywgY3VyQ29sKTtcbiAgICAgIGNlbGxUb0NvbG9yLmNsYXNzTGlzdC5yZW1vdmUoYGNhbi1wbGFjZS1zaGlwYCk7XG4gICAgICBjZWxsVG9Db2xvci5jbGFzc0xpc3QuYWRkKGBzaGlwLW9wZW4tY2VsbGApO1xuICAgIH1cbiAgfVxuXG4gICNjcmVhdGVFbXB0eUNlbGxFbGVtZW50KHJvdywgY29sKSB7XG4gICAgY29uc3QgY2VsbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNlbGxFbGVtZW50LmNsYXNzTmFtZSA9IFwiY2VsbFwiO1xuICAgIGNlbGxFbGVtZW50LmRhdGFzZXQucm93ID0gcm93O1xuICAgIGNlbGxFbGVtZW50LmRhdGFzZXQuY29sID0gY29sO1xuICAgIHJldHVybiBjZWxsRWxlbWVudDtcbiAgfVxuXG4gIGluc2VydFN0YXJ0V2luZG93KCkge1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy4jc3RhcnRXaW5kb3dDb250YWluZXIpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdGFydFZpZXcoKSB7XG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcblxuICBoZWFkZXIudGV4dENvbnRlbnQgPSBcIkJhdHRsZXNoaXBcIjtcbiAgZG9jdW1lbnQuYm9keS5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgaGVhZGVyKTtcblxuICBkb2N1bWVudC50aXRsZSA9IFwiQmF0dGxlc2hpcFwiO1xuXG4gIGNvbnN0IGJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgYm9hcmRzQ29udGFpbmVyLmNsYXNzTmFtZSA9IFwiYm9hcmRzLWNvbnRhaW5lclwiO1xuXG4gIGRvY3VtZW50LmJvZHkuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIGJvYXJkc0NvbnRhaW5lcik7XG5cbiAgY29uc3QgbGVmdFBsYXllck5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZWZ0UGxheWVyTmFtZS5jbGFzc05hbWUgPSBcImxlZnQtcGxheWVyLW5hbWUgcGxheWVyLW5hbWVcIjtcbiAgbGVmdFBsYXllck5hbWUudGV4dENvbnRlbnQgPSBcIlBsYXllclwiO1xuXG4gIGNvbnN0IHJpZ2h0UGxheWVyTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHJpZ2h0UGxheWVyTmFtZS5jbGFzc05hbWUgPSBcInJpZ2h0LXBsYXllci1uYW1lIHBsYXllci1uYW1lXCI7XG4gIHJpZ2h0UGxheWVyTmFtZS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXJcIjtcblxuICBjb25zdCBsZWZ0Qm9hcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZWZ0Qm9hcmQuY2xhc3NOYW1lID0gXCJib2FyZFwiO1xuICBsZWZ0Qm9hcmQuaWQgPSBcImxlZnQtYm9hcmRcIjtcblxuICBjb25zdCByaWdodEJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgcmlnaHRCb2FyZC5jbGFzc05hbWUgPSBcImJvYXJkXCI7XG4gIHJpZ2h0Qm9hcmQuaWQgPSBcInJpZ2h0LWJvYXJkXCI7XG5cbiAgYm9hcmRzQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBsZWZ0UGxheWVyTmFtZSk7XG4gIGJvYXJkc0NvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJiZWZvcmVlbmRcIiwgcmlnaHRQbGF5ZXJOYW1lKTtcbiAgYm9hcmRzQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImJlZm9yZWVuZFwiLCBsZWZ0Qm9hcmQpO1xuICBib2FyZHNDb250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlZW5kXCIsIHJpZ2h0Qm9hcmQpO1xufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcbiAgZm9udC1zaXplOiA2Mi41JTtcbn1cblxuaDEge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogNXJlbTtcbiAgZm9udC1mYW1pbHk6IFwiU2Vnb2UgVUlcIiwgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XG4gIGNvbG9yOiAjZTE0NjRmZmY7XG59XG5cbi5jZWxsIHtcbiAgd2lkdGg6IDNyZW07XG4gIGhlaWdodDogM3JlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRibHVlO1xuICBib3JkZXI6IDFweCBibGFjayBzb2xpZDtcbn1cblxuLmVtcHR5LWNlbGwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XG59XG5cbi5zaGlwLW9wZW4tY2VsbCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGNhZGV0Ymx1ZTtcbn1cblxuLnNoaXAtaGl0LWNlbGwge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTE0NjRmZmY7XG59XG5cbi5zaGlwLW1pc3MtY2VsbCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDQsIDI1NSwgMjgpO1xufVxuXG4ucGxheWVyLWhpdC1zaGlwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyMiwgMzcsIDQxKTtcbn1cbi5wbGF5ZXItbWlzcy1zaGlwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NCwgMjU1LCAyOCk7XG59XG5cbi5jZWxsOmhvdmVyIHtcbiAgb3BhY2l0eTogMC43O1xufVxuXG4uYm9hcmQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgM3JlbSk7XG59XG5cbi5ib2FyZDpob3ZlciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmJvYXJkcy1jb250YWluZXIge1xuICBkaXNwbGF5OiBncmlkO1xuICBjb2x1bW4tZ2FwOiA1cmVtO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMwcmVtIDMwcmVtO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4ucGxheWVyLW5hbWUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAyLjVyZW07XG59XG5cbi5tZXNzYWdlLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIGZvbnQtc2l6ZTogM3JlbTtcbiAgcGFkZGluZzogMnJlbSA0cmVtO1xuICBib3JkZXItcmFkaXVzOiAxcmVtO1xuXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG5cbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgd2lkdGg6IDIwcmVtO1xufVxuXG4ucGxheS1hZ2Fpbi1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTE0NjRmZmY7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAyLjVyZW07XG5cbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAxcmVtO1xuXG4gIHBhZGRpbmc6IDAuN3JlbSAycmVtO1xuXG4gIGJveC1zaGFkb3c6IDByZW0gMC43cmVtIDByZW0gMHJlbSByZ2IoNzcsIDExNSwgMTM4KTtcblxuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5wbGF5LWFnYWluLWJ0bjpob3ZlciB7XG4gIG9wYWNpdHk6IDAuNztcbn1cblxuLnBsYXktYWdhaW4tYnRuOmFjdGl2ZSB7XG4gIG9wYWNpdHk6IDE7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNDQsIDQzLCA0OCk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwLjVyZW0pO1xuICBib3gtc2hhZG93OiAwcmVtIDAuMnJlbSAwcmVtIDByZW0gcmdiKDc3LCAxMTUsIDEzOCk7XG59XG5cbi5jYW4tbm90LXBsYWNlLXNoaXAge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG59XG5cbi5jYW4tcGxhY2Utc2hpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xufVxuXG4uc3RhcnQtY29udHJvbHMge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTE0NjRmZmY7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZm9udC1zaXplOiAycmVtO1xuXG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcblxuICBwYWRkaW5nOiAwLjdyZW0gMnJlbTtcblxuICBib3gtc2hhZG93OiAwcmVtIDAuN3JlbSAwcmVtIDByZW0gcmdiKDc3LCAxMTUsIDEzOCk7XG5cbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc3RhcnQtY29udHJvbHM6aG92ZXIge1xuICBvcGFjaXR5OiAwLjc7XG59XG5cbi5zdGFydC1jb250cm9sczphY3RpdmUge1xuICBvcGFjaXR5OiAxO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ0LCA0MywgNDgpO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMC41cmVtKTtcbiAgYm94LXNoYWRvdzogMHJlbSAwLjJyZW0gMHJlbSAwcmVtIHJnYig3NywgMTE1LCAxMzgpO1xufVxuXG4uc3RhcnQtd2luZG93IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMnJlbTtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMTVyZW0pO1xufVxuI2JvYXJkLXRvLWNob29zZS1wbGFjZW1lbnQge1xuICBncmlkLXJvdy1zdGFydDogMjtcbiAgZ3JpZC1jb2x1bW4tc3RhcnQ6IDE7XG4gIGdyaWQtY29sdW1uLWVuZDogMztcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XG59XG5cbiNyb3RhdGUtc2hpcC1idG4ge1xuICBncmlkLXJvdzogMTtcbiAgZ3JpZC1jb2x1bW46IDE7XG59XG5cbiNzdGFydC1nYW1lLWJ0biB7XG4gIGdyaWQtcm93OiAxO1xuICBncmlkLWNvbHVtbjogMjtcbn1cbiNyZXNldC1zaGlwcy1wbGFjZW1lbnQtYnRuIHtcbiAgZ3JpZC1yb3c6IDM7XG4gIGdyaWQtY29sdW1uOiAxO1xufVxuI3JhbmRvbS1zdGFydC1nYW1lLWJ0biB7XG4gIGdyaWQtcm93OiAzO1xuICBncmlkLWNvbHVtbjogMjtcbn1cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2YsNERBQTREO0VBQzVELGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osMkJBQTJCO0VBQzNCLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQztBQUNBO0VBQ0UsbUNBQW1DO0FBQ3JDOztBQUVBO0VBQ0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVDQUF1QztBQUN6Qzs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLGtDQUFrQztFQUNsQyx1QkFBdUI7RUFDdkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLHVCQUF1QjtFQUN2QixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLG1CQUFtQjs7RUFFbkIsa0JBQWtCO0VBQ2xCLE9BQU87RUFDUCxRQUFRO0VBQ1IsaUJBQWlCO0VBQ2pCLGtCQUFrQjs7RUFFbEIsUUFBUTtFQUNSLDJCQUEyQjtFQUMzQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsWUFBWTtFQUNaLGlCQUFpQjs7RUFFakIsWUFBWTtFQUNaLG1CQUFtQjs7RUFFbkIsb0JBQW9COztFQUVwQixtREFBbUQ7O0VBRW5ELGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxVQUFVO0VBQ1Ysa0NBQWtDO0VBQ2xDLDZCQUE2QjtFQUM3QixtREFBbUQ7QUFDckQ7O0FBRUE7RUFDRSxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsWUFBWTtFQUNaLGVBQWU7O0VBRWYsWUFBWTtFQUNaLG1CQUFtQjs7RUFFbkIsb0JBQW9COztFQUVwQixtREFBbUQ7O0VBRW5ELGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxVQUFVO0VBQ1Ysa0NBQWtDO0VBQ2xDLDZCQUE2QjtFQUM3QixtREFBbUQ7QUFDckQ7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLFNBQVM7RUFDVCx1Q0FBdUM7QUFDekM7QUFDQTtFQUNFLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsa0JBQWtCO0VBQ2xCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGNBQWM7QUFDaEI7QUFDQTtFQUNFLFdBQVc7RUFDWCxjQUFjO0FBQ2hCO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsY0FBYztBQUNoQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCI6cm9vdCB7XFxuICBmb250LXNpemU6IDYyLjUlO1xcbn1cXG5cXG5oMSB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDVyZW07XFxuICBmb250LWZhbWlseTogXFxcIlNlZ29lIFVJXFxcIiwgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7XFxuICBjb2xvcjogI2UxNDY0ZmZmO1xcbn1cXG5cXG4uY2VsbCB7XFxuICB3aWR0aDogM3JlbTtcXG4gIGhlaWdodDogM3JlbTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Ymx1ZTtcXG4gIGJvcmRlcjogMXB4IGJsYWNrIHNvbGlkO1xcbn1cXG5cXG4uZW1wdHktY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGJsdWU7XFxufVxcblxcbi5zaGlwLW9wZW4tY2VsbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBjYWRldGJsdWU7XFxufVxcblxcbi5zaGlwLWhpdC1jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlMTQ2NGZmZjtcXG59XFxuXFxuLnNoaXAtbWlzcy1jZWxsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDQsIDI1NSwgMjgpO1xcbn1cXG5cXG4ucGxheWVyLWhpdC1zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjIsIDM3LCA0MSk7XFxufVxcbi5wbGF5ZXItbWlzcy1zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDQsIDI1NSwgMjgpO1xcbn1cXG5cXG4uY2VsbDpob3ZlciB7XFxuICBvcGFjaXR5OiAwLjc7XFxufVxcblxcbi5ib2FyZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDNyZW0pO1xcbn1cXG5cXG4uYm9hcmQ6aG92ZXIge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uYm9hcmRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgY29sdW1uLWdhcDogNXJlbTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMzByZW0gMzByZW07XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLnBsYXllci1uYW1lIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG59XFxuXFxuLm1lc3NhZ2UtY29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbiAgcGFkZGluZzogMnJlbSA0cmVtO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG5cXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcblxcbiAgdG9wOiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XFxuICB3aWR0aDogMjByZW07XFxufVxcblxcbi5wbGF5LWFnYWluLWJ0biB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTE0NjRmZmY7XFxuICBjb2xvcjogd2hpdGU7XFxuICBmb250LXNpemU6IDIuNXJlbTtcXG5cXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XFxuXFxuICBwYWRkaW5nOiAwLjdyZW0gMnJlbTtcXG5cXG4gIGJveC1zaGFkb3c6IDByZW0gMC43cmVtIDByZW0gMHJlbSByZ2IoNzcsIDExNSwgMTM4KTtcXG5cXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnBsYXktYWdhaW4tYnRuOmhvdmVyIHtcXG4gIG9wYWNpdHk6IDAuNztcXG59XFxuXFxuLnBsYXktYWdhaW4tYnRuOmFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0NCwgNDMsIDQ4KTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwLjVyZW0pO1xcbiAgYm94LXNoYWRvdzogMHJlbSAwLjJyZW0gMHJlbSAwcmVtIHJnYig3NywgMTE1LCAxMzgpO1xcbn1cXG5cXG4uY2FuLW5vdC1wbGFjZS1zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcXG59XFxuXFxuLmNhbi1wbGFjZS1zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4uc3RhcnQtY29udHJvbHMge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UxNDY0ZmZmO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgZm9udC1zaXplOiAycmVtO1xcblxcbiAgYm9yZGVyOiBub25lO1xcbiAgYm9yZGVyLXJhZGl1czogMXJlbTtcXG5cXG4gIHBhZGRpbmc6IDAuN3JlbSAycmVtO1xcblxcbiAgYm94LXNoYWRvdzogMHJlbSAwLjdyZW0gMHJlbSAwcmVtIHJnYig3NywgMTE1LCAxMzgpO1xcblxcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc3RhcnQtY29udHJvbHM6aG92ZXIge1xcbiAgb3BhY2l0eTogMC43O1xcbn1cXG5cXG4uc3RhcnQtY29udHJvbHM6YWN0aXZlIHtcXG4gIG9wYWNpdHk6IDE7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQ0LCA0MywgNDgpO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDAuNXJlbSk7XFxuICBib3gtc2hhZG93OiAwcmVtIDAuMnJlbSAwcmVtIDByZW0gcmdiKDc3LCAxMTUsIDEzOCk7XFxufVxcblxcbi5zdGFydC13aW5kb3cge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAycmVtO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMTVyZW0pO1xcbn1cXG4jYm9hcmQtdG8tY2hvb3NlLXBsYWNlbWVudCB7XFxuICBncmlkLXJvdy1zdGFydDogMjtcXG4gIGdyaWQtY29sdW1uLXN0YXJ0OiAxO1xcbiAgZ3JpZC1jb2x1bW4tZW5kOiAzO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcblxcbiNyb3RhdGUtc2hpcC1idG4ge1xcbiAgZ3JpZC1yb3c6IDE7XFxuICBncmlkLWNvbHVtbjogMTtcXG59XFxuXFxuI3N0YXJ0LWdhbWUtYnRuIHtcXG4gIGdyaWQtcm93OiAxO1xcbiAgZ3JpZC1jb2x1bW46IDI7XFxufVxcbiNyZXNldC1zaGlwcy1wbGFjZW1lbnQtYnRuIHtcXG4gIGdyaWQtcm93OiAzO1xcbiAgZ3JpZC1jb2x1bW46IDE7XFxufVxcbiNyYW5kb20tc3RhcnQtZ2FtZS1idG4ge1xcbiAgZ3JpZC1yb3c6IDM7XFxuICBncmlkLWNvbHVtbjogMjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJfIiwiY2VsbFN0YXRlIiwiR2FtZUJvYXJkIiwiUGxheWVyIiwiY3JlYXRlU3RhcnRWaWV3IiwiaW5zZXJ0UGxheWVyQm9hcmQiLCJpbnNlcnRPcHBvbmVudEJvYXJkIiwic2hvd0dhbWVPdmVyTWVzc2FnZSIsImluc2VydFN0YXJ0V2luZG93IiwidGltZXIiLCJtcyIsIlByb21pc2UiLCJyZXNvbHZlIiwic2V0VGltZW91dCIsIm1vdmVDb21wdXRlciIsImNvbXB1dGVyIiwicGxheWVyIiwiaGFuZGxlR2FtZU92ZXIiLCJpc0F0dGFja2luZyIsImNvb3JkcyIsImF0dGFjayIsImJvYXJkIiwicm93IiwiY29sIiwiaGl0Iiwic2hpcHNQbGFjZW1lbnQiLCJhbGxTaGlwc1N1bmsiLCJoYW5kbGVBdHRhY2siLCJfcmVmIiwiYmluZCIsInBsYXllckhpdCIsInN0YXJ0R2FtZUxvb3AiLCJhZGRlZFNoaXBzIiwicGxheWVyR2FtZUJvYXJkIiwiY29tcHV0ZXJHYW1lQm9hcmQiLCJoYW5kbGVQbGF5QWdhaW4iLCJtaXNzIiwiU2hpcCIsIkFycmF5IiwiZnJvbSIsImxlbmd0aCIsImkiLCJzaGlwcyIsImNvbnN0cnVjdG9yIiwicmFuZG9tbHlQbGFjZVNoaXBzIiwiaXNIb3Jpem9udGFsIiwic2hpcCIsInBsYWNlU2hpcEluQ2VsbE51bWJlciIsImNvcHlPZlNoaXBQbGFjZW1lbnQiLCJwdXNoIiwibWFwIiwiY2VsbCIsImNvcHlPZkJvYXJkIiwiaXNTdW5rIiwicmVjZWl2ZUF0dGFjayIsInJhbmRJbnRGcm9tMFRvTWF4IiwiI3JhbmRJbnRGcm9tMFRvTWF4IiwibWF4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicmFuZG9tQm9vbGVhbiIsIiNyYW5kb21Cb29sZWFuIiwiZ2V0Q29vcmRzT2ZOdGhGcmVlQ2VsbEluU2hpcHNQbGFjZW1lbnQiLCIjZ2V0Q29vcmRzT2ZOdGhGcmVlQ2VsbEluU2hpcHNQbGFjZW1lbnQiLCJuIiwiY3VycmVudEZyZWVDZWxsTnVtYmVyIiwiI3JhbmRvbWx5UGxhY2VTaGlwcyIsInJlbWFpbmluZ0NlbGxzIiwiZnJlZUNlbGxOdW1iZXIiLCJjYW5QbGFjZVNoaXBJbkNlbGwiLCIjY2FuUGxhY2VTaGlwSW5DZWxsIiwiY2FuUGxhY2VTaGlwSW5DZWxsSG9yaXpvbnRhbCIsImNhblBsYWNlU2hpcEluQ2VsbFZlcnRpY2FsIiwiI2NhblBsYWNlU2hpcEluQ2VsbEhvcml6b250YWwiLCJsZW5ndGhFeGNlZWRzQm9yZGVyIiwibGVmdEVuZENvbCIsImxlZnRFbmROb3RGcmVlIiwicmlnaHRFbmRDb2wiLCJtaW4iLCJyaWdodEVuZE5vdEZyZWUiLCJjdXJDb2wiLCJjZWxsTm90RnJlZSIsInRvcFNpZGVSb3ciLCJ0b3BTaWRlTm90RnJlZSIsImJvdHRvbVNpZGVSb3ciLCJib3R0b21TaWRlTm90RnJlZSIsIiNjYW5QbGFjZVNoaXBJbkNlbGxWZXJ0aWNhbCIsIl9yZWYyIiwidG9wUm93IiwidG9wRW5kTm90RnJlZSIsImJvdHRvbVJvdyIsImJvdHRvbUVuZE5vdEZyZWUiLCJjdXJSb3ciLCJsZWZ0Q29sIiwibGVmdFNpZGVOb3RGcmVlIiwicmlnaHRDb2wiLCJyaWdodFNpZGVOb3RGcmVlIiwiI3BsYWNlU2hpcEluQ2VsbE51bWJlciIsIl9yZWYzIiwicmVzZXQiLCJmb3JFYWNoIiwiZW5lbXlHYW1lQm9hcmQiLCJnYW1lQm9hcmQiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJyYW5kb21FbXB0eUNlbGwiLCIjcmFuZG9tRW1wdHlDZWxsIiwiZW1wdHlDZWxscyIsInJhbmRvbUluZGV4IiwiaGl0cyIsIndpbm5lciIsImJvYXJkc0NvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIm1lc3NhZ2VDb250YWluZXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwibWVzc2FnZSIsInRleHRDb250ZW50IiwicGxheUFnYWluQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZSIsIm9uY2xpY2siLCJpbnNlcnRBZGphY2VudEVsZW1lbnQiLCJvcHBvbmVudEJvYXJkIiwiaGFuZGxlQ2xpY2tPbkNlbGwiLCJib2FyZEVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImNlbGxFbGVtZW50IiwiZGF0YXNldCIsImNsYXNzTGlzdCIsImFkZCIsImV2ZW50IiwidGFyZ2V0IiwiY2xvc2VzdCIsInNoaXBzUGxhY2VtZW50UGxheWVyIiwiaGl0TWlzc0JvYXJkUGxheWVyIiwiU3RhcnRXaW5kb3ciLCJoYW5kbGVTdGFydEdhbWUiLCJzdGFydFdpbmRvdyIsInNoaXBMZW5ndGhzIiwicGxhY2VtZW50IiwicyIsInJvdGF0ZUJ0biIsImNyZWF0ZVJvdGF0ZUJ0biIsInJlc2V0QnRuIiwiY3JlYXRlUmVzZXRCdG4iLCJzdGFydEJ0biIsImNyZWF0ZVN0YXJ0QnRuIiwic3RhcnRSYW5kb21CdG4iLCJjcmVhdGVTdGFydFJhbmRvbUJ0biIsInN0YXJ0V2luZG93Q29udGFpbmVyIiwiY3JlYXRlU3RhcnRXaW5kb3dDb250YWluZXIiLCJjcmVhdGVCb2FyZCIsImZpbGxCb2FyZCIsImJvZHkiLCIjbGVuZ3RoIiwiI2ZpbGxCb2FyZCIsImNyZWF0ZUVtcHR5Q2VsbEVsZW1lbnQiLCJjb2xvck5DZWxscyIsInJlbW92ZUNvbG9yTkNlbGxzIiwicGlja0NlbGwiLCIjY3JlYXRlQm9hcmQiLCJpZCIsIiNjcmVhdGVTdGFydFdpbmRvd0NvbnRhaW5lciIsIiNjcmVhdGVSZXNldEJ0biIsImNoaWxkcmVuIiwiI2NyZWF0ZVN0YXJ0QnRuIiwiI2NyZWF0ZVN0YXJ0UmFuZG9tQnRuIiwiI2NyZWF0ZVJvdGF0ZUJ0biIsInNlbGVjdENlbGwiLCIjc2VsZWN0Q2VsbCIsIiNjb2xvck5DZWxscyIsInN0YXJ0IiwiZW5kIiwiY2FuUGxhY2UiLCJjdXIiLCJjZWxsVG9Db2xvciIsIiNyZW1vdmVDb2xvck5DZWxscyIsIiNjYW5QbGFjZSIsIiNwaWNrQ2VsbCIsIiNjcmVhdGVFbXB0eUNlbGxFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJoZWFkZXIiLCJ0aXRsZSIsImxlZnRQbGF5ZXJOYW1lIiwicmlnaHRQbGF5ZXJOYW1lIiwibGVmdEJvYXJkIiwicmlnaHRCb2FyZCJdLCJzb3VyY2VSb290IjoiIn0=