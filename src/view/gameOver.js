export default function showGameOverMessage(winner, handlePlayAgain) {
  const boardsContainer = document.querySelector(".boards-container");

  const messageContainer = document.createElement("div");
  messageContainer.className = "message-container";

  const message = document.createElement("div");
  message.className = "game-over-message";
  message.textContent = `${winner} won!`;

  const playAgainBtn = document.createElement("button");
  playAgainBtn.className = "play-again-btn";
  playAgainBtn.textContent = "PLAY AGAIN";

  playAgainBtn.addEventListener("click", () => {
    messageContainer.remove();
    handlePlayAgain();
  });

  playAgainBtn.onclick = handlePlayAgain;

  messageContainer.insertAdjacentElement("beforeend", message);
  messageContainer.insertAdjacentElement("beforeend", playAgainBtn);

  boardsContainer.insertAdjacentElement("beforeend", messageContainer);
}
