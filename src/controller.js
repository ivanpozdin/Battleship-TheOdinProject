// eslint-disable-next-line no-unused-vars
import _ from "./style.css";

import cellState from "./model/cellState";
import GameBoard from "./model/gameboard";
import Player from "./model/player";

import createStartView from "./view/view";
import insertPlayerBoard from "./view/insertPlayerBoard";
import insertOpponentBoard from "./view/insertOpponentBoard";
import showGameOverMessage from "./view/gameOver";

import insertStartWindow from "./view/userShipsPlacement";

const timer = async function (ms) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
};

const moveComputer = async function (computer, player, handleGameOver) {
  computer.isAttacking = true;
  await timer(500);
  let coords = computer.attack();

  while (player.board[coords.row][coords.col] === cellState.hit) {
    insertPlayerBoard(player.shipsPlacement, player.board);
    if (player.allShipsSunk) {
      showGameOverMessage("Computer", handleGameOver);
      return;
    }
    await timer(500);
    coords = computer.attack();
  }

  insertPlayerBoard(player.shipsPlacement, player.board);
  computer.isAttacking = false;
  if (player.allShipsSunk) {
    showGameOverMessage("Computer", handleGameOver);
  }
};

const handleAttack = async function (
  player,
  computer,
  handleGameOver,
  { row, col }
) {
  if (player.allShipsSunk || computer.allShipsSunk || computer.isAttacking) {
    return;
  }

  if (!player.attack({ row, col })) return;

  insertOpponentBoard(
    computer.board,
    handleAttack.bind(null, player, computer, handleGameOver)
  );

  if (computer.allShipsSunk) {
    showGameOverMessage("You", handleGameOver);
    return;
  }
  const playerHit = computer.board[row][col] === cellState.hit;
  if (playerHit) return;

  await moveComputer(computer, player, handleGameOver);
};

const startGameLoop = function (addedShips) {
  const playerGameBoard = new GameBoard(addedShips);
  const computerGameBoard = new GameBoard();

  const player = new Player(playerGameBoard, computerGameBoard);
  const computer = new Player(computerGameBoard, playerGameBoard);

  const handlePlayAgain = function () {
    insertStartWindow(startGameLoop);
  };

  createStartView();
  insertPlayerBoard(player.shipsPlacement, player.board);
  insertOpponentBoard(
    computer.board,
    handleAttack.bind(null, player, computer, handlePlayAgain)
  );
};

insertStartWindow(startGameLoop);
