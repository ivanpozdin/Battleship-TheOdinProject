import Ship from "../../src/model/ship";

test("Ship of length 2 is sunk after 2 hits", () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk).toBe(true);
});

test("Ship isn't sunk before being hit creation", () => {
  const ship = new Ship(2);
  expect(ship.isSunk).toBe(false);
});

test("Ship isn't sunk before getting the length number of hits", () => {
  const ship = new Ship(4);
  ship.hit();
  ship.hit();
  expect(ship.isSunk).toBe(false);
});
