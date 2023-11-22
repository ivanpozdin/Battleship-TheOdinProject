import cellState from "../model/cellState";

export default function insertPlayerBoard(opponentBoard, handleClickOnCell) {
  const boardElement = document.getElementById("right-board");
  boardElement.innerHTML = "";

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.x = x;
      cellElement.dataset.y = y;

      if (opponentBoard[x][y] === cellState.hit) {
        cellElement.classList.add("ship-hit-cell");
      } else if (opponentBoard[x][y] === cellState.miss) {
        cellElement.classList.add("ship-miss-cell");
      } else {
        cellElement.classList.add("empty-cell");
      }

      boardElement.insertAdjacentElement("beforeend", cellElement);
    }
  }

  boardElement.addEventListener("click", (event) => {
    const cell = event.target.closest(".cell");
    if (!cell) return;

    handleClickOnCell({
      x: +cell.dataset.x,
      y: +cell.dataset.y,
    });
  });

  return boardElement;
}
