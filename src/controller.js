// eslint-disable-next-line no-unused-vars
import _ from "./style.css";

import cellState from "./model/cellState";
import GameBoard from "./model/gameboard";
import Player from "./model/player";

import createStartView from "./view/view";
import insertPlayerBoard from "./view/insertPlayerBoard";
import insertOpponentBoard from "./view/insertOpponentBoard";

const timerPromise = async function (ms) {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms)
  );
};

const moveComputer = async function (computer, player) {
  computer.isAttacking = true;
  await timerPromise(500);
  let coords = computer.attack();

  while (player.board[coords.x][coords.y] === cellState.hit) {
    insertPlayerBoard(player.shipsPlacement, player.board);
    if (player.allShipsSunk) {
      alert("Computer won!!!");
      return;
    }
    await timerPromise(500);
    coords = computer.attack();
  }

  insertPlayerBoard(player.shipsPlacement, player.board);
  computer.isAttacking = false;
  if (player.allShipsSunk) {
    alert("Computer won!!!");
  }
};

const handleAttack = async function (player, computer, cellNumber) {
  if (player.allShipsSunk || computer.allShipsSunk || computer.isAttacking) {
    return;
  }

  const x = Math.floor(cellNumber / 10);
  const y = cellNumber % 10;

  if (!player.attack({ x, y })) return;

  insertOpponentBoard(
    computer.board,
    handleAttack.bind(null, player, computer)
  );

  if (computer.allShipsSunk) {
    alert("You won!!!");
    return;
  }
  if (computer.board[x][y] === cellState.hit) return;

  await moveComputer(computer, player);
};

const startGameLoop = function () {
  const playerGameBoard = new GameBoard();
  const computerGameBoard = new GameBoard();

  const player = new Player(playerGameBoard, computerGameBoard);
  const computer = new Player(computerGameBoard, playerGameBoard);

  createStartView();
  insertPlayerBoard(player.shipsPlacement, player.board);
  insertOpponentBoard(
    computer.board,
    handleAttack.bind(null, player, computer)
  );
};

startGameLoop();
