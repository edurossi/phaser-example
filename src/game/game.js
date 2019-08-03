import Phaser from "phaser";

export default class Game extends Phaser.Game {
  constructor(config) {
    super(config);

    this._difficult = 0;
  }

  setDifficult(difficult) {
    this._difficult = difficult;
  }
  getDifficult() {
    return this._difficult;
  }
}
