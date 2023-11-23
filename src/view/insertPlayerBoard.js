import cellState from "../model/cellState";

export default function insertPlayerBoard(
  shipsPlacementPlayer,
  hitMissBoardPlayer
) {
  const boardElement = document.getElementById("left-board");
  boardElement.innerHTML = "";

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.row = row;
      cellElement.dataset.col = col;

      if (shipsPlacementPlayer[row][col]) {
        if (hitMissBoardPlayer[row][col] === cellState.hit) {
          cellElement.classList.add("player-hit-ship");
        } else {
          cellElement.classList.add("ship-open-cell");
        }
      } else {
        if (hitMissBoardPlayer[row][col] === cellState.miss) {
          cellElement.classList.add("player-miss-ship");
        } else {
          cellElement.classList.add("empty-cell");
        }
      }

      boardElement.insertAdjacentElement("beforeend", cellElement);
    }
  }
}
