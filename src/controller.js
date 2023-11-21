import _ from "./style.css";
import GameBoard from "./model/gameboard";
import Player from "./model/player";

import createStartView from "./view/view";
import insertPlayerBoard from "./view/insertPlayerBoard";
import insertOpponentBoard from "./view/insertOpponentBoard";

const handleAttack = function (player, computer, cellNumber) {
  if (player.allShipsSunk || computer.allShipsSunk) {
    return;
  }

  if (
    !player.attack({
      x: Math.floor(cellNumber / 10),
      y: cellNumber % 10,
    })
  )
    return;

  insertOpponentBoard(
    computer.board,
    handleAttack.bind(null, player, computer)
  );

  if (computer.allShipsSunk) {
    alert("You won!!!");
    return;
  }

  computer.attack();
  console.log(player.board);
  insertPlayerBoard(player.shipsPlacement, player.board);
  if (player.allShipsSunk) {
    alert("Computer won!!!");
  }
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
