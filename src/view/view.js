export default function createStartView() {
  const header = document.createElement("h1");

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
