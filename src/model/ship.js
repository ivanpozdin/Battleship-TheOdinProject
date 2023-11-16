export default class Ship {
  #length;
  #hits = 0;
  constructor(length) {
    this.#length = length;
  }

  get isSunk() {
    return this.#length === this.#hits;
  }

  get length() {
    return this.#length;
  }

  get hits() {
    return this.#hits;
  }

  hit() {
    if (this.isSunk) {
      return;
    }
    this.#hits++;
  }
}
