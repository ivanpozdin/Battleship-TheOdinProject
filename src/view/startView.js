export default class StartWindow {
  #handleStartGame;
  #shipLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  #addedShips = [];
  #placement = Array.from({ length: 10 }, (_) =>
    Array.from({ length: 10 }, (_, i) => false)
  );

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
    startWindowContainer.insertAdjacentElement(
      "beforeend",
      this.#startRandomBtn
    );

    return startWindowContainer;
  }

  #createResetBtn() {
    const resetBtn = document.createElement("button");
    resetBtn.id = "reset-ships-placement-btn";
    resetBtn.className = "start-controls";
    resetBtn.textContent = "RESET";

    resetBtn.addEventListener("click", () => {
      this.#isHorizontal = true;
      this.#placement = Array.from({ length: 10 }, (_) =>
        Array.from({ length: 10 }, (_, i) => false)
      );
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
      const cellToColor = this.#board.querySelector(
        `[data-row="${curRow}"][data-col="${curCol}"]`
      );

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

    this.#addedShips.push({ row, col, isHorizontal: this.#isHorizontal });

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
