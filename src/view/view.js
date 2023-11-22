export default function createStartView() {
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
