import cellState from "../model/cellState";

export default function insertPlayerBoard(opponentBoard, handleClickOnCell) {
  const boardElement = document.getElementById("right-board");
  boardElement.innerHTML = "";

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.cellNumber = x * 10 + y;

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

    handleClickOnCell(cell.dataset.cellNumber);
  });

  return boardElement;
}
