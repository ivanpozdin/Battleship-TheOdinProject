const createResetBtn = function () {
  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-ships-placement-btn";
  resetBtn.className = "start-controls";
  resetBtn.textContent = "RESET";
  return resetBtn;
};

const createStartBtn = function () {
  const startBtn = document.createElement("button");
  startBtn.id = "start-game-btn";
  startBtn.className = "start-controls";
  startBtn.textContent = "START";
  return startBtn;
};

const createStartRandomBtn = function () {
  const startBtn = document.createElement("button");
  startBtn.id = "random-start-game-btn";
  startBtn.className = "start-controls";
  startBtn.textContent = "RANDOM";
  return startBtn;
};

const createRotateBtn = function () {
  const rotateBtn = document.createElement("button");
  rotateBtn.id = "rotate-ship-btn";
  rotateBtn.className = "start-controls";
  rotateBtn.textContent = "ROTATE";
  return rotateBtn;
};

const selectCell = function (board, row, col) {
  return board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
};

const colorNCells = function (
  placement,
  board,
  isHorizontal,
  length,
  row,
  col
) {
  const startCur = isHorizontal ? col : row;
  const endCur = startCur + length;

  let canPlace = endCur <= 10;

  for (let cur = startCur; cur < Math.min(10, endCur); cur++) {
    if (placement[isHorizontal ? row : cur][isHorizontal ? cur : col]) {
      canPlace = false;
    }
  }

  for (let cur = startCur; cur < Math.min(10, endCur); cur++) {
    const cellToColor = selectCell(
      board,
      isHorizontal ? row : cur,
      isHorizontal ? cur : col
    );
    if (placement[isHorizontal ? row : cur][isHorizontal ? cur : col]) {
      continue;
    }
    cellToColor.classList.remove(`can${canPlace ? "-not" : ""}-place-ship`);

    cellToColor.classList.add(`can${canPlace ? "" : "-not"}-place-ship`);
  }
};

const removeColorNCells = function (
  placement,
  board,
  isHorizontal,
  length,
  row,
  col
) {
  const startCur = isHorizontal ? col : row;
  const endCur = startCur + length;
  for (let cur = startCur; cur < Math.min(10, endCur); cur++) {
    if (placement[isHorizontal ? row : cur][isHorizontal ? cur : col]) {
      continue;
    }
    const cellToColor = board.querySelector(
      `[data-row="${isHorizontal ? row : cur}"][data-col="${
        isHorizontal ? cur : col
      }"]`
    );

    cellToColor.classList.remove(`can-not-place-ship`, `can-place-ship`);
  }
};

const createEmptyCellElement = function (row, col) {
  const cellElement = document.createElement("div");
  cellElement.className = "cell";
  cellElement.dataset.row = row;
  cellElement.dataset.col = col;
  return cellElement;
};

export default function insertStartWindow(handleStartGame) {
  document.body.innerHTML = "";
  let addedShips = [];

  const startWindowContainer = document.createElement("div");
  startWindowContainer.className = "start-window";

  const lengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  let placement = Array.from({ length: 10 }, (_) =>
    Array.from({ length: 10 }, (_, i) => false)
  );

  const rotateBtn = createRotateBtn();
  const resetBtn = createResetBtn();
  const startBtn = createStartBtn();
  const startRandomBtn = createStartRandomBtn();

  let isHorizontal = true;

  startWindowContainer.insertAdjacentElement("beforeend", rotateBtn);
  startWindowContainer.insertAdjacentElement("beforeend", resetBtn);
  startWindowContainer.insertAdjacentElement("beforeend", startBtn);
  startWindowContainer.insertAdjacentElement("beforeend", startRandomBtn);

  const board = document.createElement("div");
  board.id = "board-to-choose-placement";
  board.className = "board";

  rotateBtn.addEventListener("click", () => {
    isHorizontal = !isHorizontal;
  });

  resetBtn.addEventListener("click", () => {
    isHorizontal = true;
    placement = Array.from({ length: 10 }, (_) =>
      Array.from({ length: 10 }, (_, i) => false)
    );
    addedShips = [];

    for (const cell of board.children) {
      cell.className = "cell";
    }
  });

  startRandomBtn.addEventListener("click", () => {
    startWindowContainer.remove();
    handleStartGame();
  });

  startBtn.addEventListener("click", () => {
    if (addedShips.length !== lengths.length) {
      return;
    }
    startWindowContainer.remove();
    handleStartGame(addedShips);
  });

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cellElement = createEmptyCellElement(row, col);

      cellElement.addEventListener("mouseenter", () => {
        console.log(addedShips.length);
        colorNCells(
          placement,
          board,
          isHorizontal,
          lengths[addedShips.length],
          row,
          col
        );
      });

      cellElement.addEventListener("mouseleave", () => {
        console.log(addedShips.length);
        removeColorNCells(
          placement,
          board,
          isHorizontal,
          lengths[addedShips.length],
          row,
          col
        );
      });

      cellElement.addEventListener("click", () => {
        if (addedShips.length === lengths.length) return;
        const startCur = isHorizontal ? col : row;
        const endCur = startCur + lengths[addedShips.length];
        if (endCur > 10) {
          return;
        }

        for (let cur = startCur; cur < Math.min(10, endCur); cur++) {
          if (placement[isHorizontal ? row : cur][isHorizontal ? cur : col]) {
            return;
          }
        }
        addedShips.push({ row, col, isHorizontal });
        for (let cur = startCur; cur < Math.min(10, endCur); cur++) {
          placement[isHorizontal ? row : cur][isHorizontal ? cur : col] = true;

          const cellToColor = selectCell(
            board,
            isHorizontal ? row : cur,
            isHorizontal ? cur : col
          );

          cellToColor.classList.remove(`can-place-ship`);

          cellToColor.classList.add(`ship-open-cell`);
          console.log(cellToColor);
        }
      });

      board.insertAdjacentElement("beforeend", cellElement);
    }
  }
  startWindowContainer.insertAdjacentElement("beforeend", board);
  document.body.appendChild(startWindowContainer);
}
