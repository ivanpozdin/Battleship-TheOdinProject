import cellState from "../model/cellState";

export default function insertPlayerBoard(opponentBoard, handleClickOnCell) {
  const boardElement = document.getElementById("right-board");
  boardElement.innerHTML = "";

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.row = row;
      cellElement.dataset.col = col;

      if (opponentBoard[row][col] === cellState.hit) {
        cellElement.classList.add("ship-hit-cell");
      } else if (opponentBoard[row][col] === cellState.miss) {
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
      row: +cell.dataset.row,
      col: +cell.dataset.col,
    });
  });

  return boardElement;
}
