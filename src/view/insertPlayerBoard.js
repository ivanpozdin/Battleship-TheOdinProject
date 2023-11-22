import cellState from "../model/cellState";

export default function insertPlayerBoard(
  shipsPlacementPlayer,
  hitMissBoardPlayer
) {
  const boardElement = document.getElementById("left-board");
  boardElement.innerHTML = "";

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cellElement = document.createElement("div");
      cellElement.className = "cell";
      cellElement.dataset.x = x;
      cellElement.dataset.y = y;

      if (shipsPlacementPlayer[x][y]) {
        if (hitMissBoardPlayer[x][y] === cellState.hit) {
          cellElement.classList.add("player-hit-ship");
        } else {
          cellElement.classList.add("ship-open-cell");
        }
      } else {
        if (hitMissBoardPlayer[x][y] === cellState.miss) {
          cellElement.classList.add("player-miss-ship");
        } else {
          cellElement.classList.add("empty-cell");
        }
      }

      boardElement.insertAdjacentElement("beforeend", cellElement);
    }
  }
  return boardElement;
}
