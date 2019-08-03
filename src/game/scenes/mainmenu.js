import Phaser from "phaser";
import { GameParams } from "../const/game-params";

export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  init() {
    this._keyEasy = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    this._keyMedium = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    this._keyHard = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
  }

  preload() {
    this.load.bitmapFont("snakeFont", "assets/font-snake.png", "assets/font-snake.fnt");
  }

  create() {
    this.add.bitmapText(
      this.sys.canvas.width / 2 - 140,
      this.sys.canvas.height / 2 - 120,
      "snakeFont",
      "S N A K E",
      32,
    );
    this.add.bitmapText(this.sys.canvas.width / 2 - 84, this.sys.canvas.height / 2 - 20, "snakeFont", "1: EASY", 16);
    this.add.bitmapText(this.sys.canvas.width / 2 - 84, this.sys.canvas.height / 2 - 0, "snakeFont", "2: MEDIUM", 16);
    this.add.bitmapText(this.sys.canvas.width / 2 - 84, this.sys.canvas.height / 2 + 20, "snakeFont", "3: HARD", 16);
  }

  update() {
    if (this._keyEasy.isDown) {
      this.game.setDifficult(GameParams.DIFFICULT_EASY);
      this.scene.start("SceneLevel");
    } else if (this._keyMedium.isDown) {
      this.game.setDifficult(GameParams.DIFFICULT_MEDIUM);
      this.scene.start("SceneLevel");
    } else if (this._keyHard.isDown) {
      this.game.setDifficult(GameParams.DIFFICULT_HARD);
      this.scene.start("SceneLevel");
    }
  }
}
