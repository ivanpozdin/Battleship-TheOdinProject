import GameBoard from "../../src/model/gameboard";

test("Random ship placement", () => {
  const board = new GameBoard();
  const placement = board.shipsPlacement;
  let filledCellsCounter = 0;
  placement.forEach((row) => {
    row.forEach((cell) => {
      if (cell) filledCellsCounter++;
    });
  });
  expect(filledCellsCounter).toBe(20);
});

test("Ships aren't sunk before attacks", () => {
  const board = new GameBoard();
  expect(board.allShipsSunk).toBe(false);
});

test("All ships are sunk after hit in every cell", () => {
  const board = new GameBoard();
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      board.receiveAttack(x, y);
    }
  }
  expect(board.allShipsSunk).toBe(true);
});
