const createResetBtn = function () {
  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-ships-placement-btn";
  resetBtn.textContent = "RESET";
  return resetBtn;
};

const createStartBtn = function () {
  const startBtn = document.createElement("button");
  startBtn.id = "start-game-btn";
  startBtn.textContent = "START";
  return startBtn;
};

const createRotateBtn = function () {
  const rotateBtn = document.createElement("button");
  rotateBtn.id = "rotate-ship-btn";
  rotateBtn.textContent = "ROTATE";
  return rotateBtn;
};

const selectCell = function (board, row, col) {
  return board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
};

const colorNCells = function (shipsPlacement, isHorizontal, length, row, col) {
  const startCur = isHorizontal ? col : row;
  const endCur = startCur + length;

  const canPlace = endCur <= 10;

  for (let cur = startCur; cur < Math.min(10, endCur); cur++) {
    const cellToColor = selectCell(
      shipsPlacement,
      isHorizontal ? row : cur,
      isHorizontal ? cur : col
    );

    cellToColor.classList.remove(
      `can${canPlace ? "-not" : ""}-place-ship`,
      "empty-cell"
    );

    cellToColor.classList.add(`can${canPlace ? "" : "-not"}-place-ship`);
    console.log(cellToColor);
  }
};

const removeColorNCells = function (
  shipsPlacement,
  isHorizontal,
  length,
  row,
  col
) {
  for (
    let curCol = isHorizontal ? col : row;
    curCol < Math.min(10, (isHorizontal ? col : row) + length);
    curCol++
  ) {
    const cellToColor = shipsPlacement.querySelector(
      `[data-row="${isHorizontal ? row : curCol}"][data-col="${
        isHorizontal ? curCol : col
      }"]`
    );

    cellToColor.classList.remove(`can-not-place-ship`, `can-place-ship`);
    cellToColor.classList.add("empty-cell");
  }
};

const createEmptyCellElement = function (row, col) {
  const cellElement = document.createElement("div");
  cellElement.className = "cell";
  cellElement.dataset.row = row;
  cellElement.dataset.col = col;
  cellElement.classList.add("empty-cell");
  return cellElement;
};

export default function insertStartWindow() {
  const startWindowContainer = document.createElement("div");
  startWindowContainer.className = "start-window";

  const length = 4;

  const resetBtn = createResetBtn();
  const startBtn = createStartBtn();

  let isHorizontal = true;
  const rotateBtn = createRotateBtn();

  startWindowContainer.insertAdjacentElement("beforeend", rotateBtn);
  startWindowContainer.insertAdjacentElement("beforeend", resetBtn);
  startWindowContainer.insertAdjacentElement("beforeend", startBtn);

  const shipsPlacement = document.createElement("div");
  shipsPlacement.id = "board-to-choose-placement";
  shipsPlacement.className = "board";

  rotateBtn.addEventListener("click", () => {
    isHorizontal = !isHorizontal;
  });

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cellElement = createEmptyCellElement(row, col);

      cellElement.addEventListener("mouseenter", () => {
        colorNCells(shipsPlacement, isHorizontal, length, row, col);
      });

      cellElement.addEventListener("mouseleave", () => {
        removeColorNCells(shipsPlacement, isHorizontal, length, row, col);
      });

      shipsPlacement.insertAdjacentElement("beforeend", cellElement);
    }
  }
  startWindowContainer.insertAdjacentElement("beforeend", shipsPlacement);
  document.body.appendChild(startWindowContainer);
}
