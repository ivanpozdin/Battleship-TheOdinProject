import GameBoard from "../../src/model/gameboard";
import Player from "../../src/model/player";

test("1 random attack", () => {
  const gameBoard = new GameBoard();
  const player = new Player(gameBoard);
  player.attack();
  let attackedCellsCounter = 0;
  gameBoard.board.forEach((row) => {
    row.forEach((cell) => {
      if (cell) attackedCellsCounter++;
    });
  });
  expect(attackedCellsCounter).toBe(1);
});

test("100 random attacks lead to all sunk ships", () => {
  const gameBoard = new GameBoard();
  const player = new Player(gameBoard);
  for (let i = 0; i < 100; i++) player.attack();

  expect(gameBoard.allShipsSunk).toBe(true);
});

test("19 random attacks don't lead to all sunk ships", () => {
  const gameBoard = new GameBoard();
  const player = new Player(gameBoard);
  for (let i = 0; i < 19; i++) player.attack();

  expect(gameBoard.allShipsSunk).toBe(false);
});

test("Attack specific cell", () => {
  const gameBoard = new GameBoard();
  const player = new Player(gameBoard);
  player.attack({ x: 5, y: 5 });
  expect(gameBoard.board[5][5]).toBeTruthy();
});
