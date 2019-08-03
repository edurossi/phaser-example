import Phaser from "phaser";
import Snake from "../actors/snake";
import Apple from "../actors/apple";
import { SpriteSnake } from "../const/sprite-snake";
import { SnakeDir } from "../const/snake-dir";
import { GameParams } from "../const/game-params";

export default class SceneLevel extends Phaser.Scene {
  constructor() {
    super({ key: "SceneLevel" });
  }

  init() {
    this.tileSize = 64;
    this.mapData = [
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 3, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
    ];
    this.mapWidth = this.mapData[0].length;
    this.mapHeight = this.mapData.length;
    this.snake = new Snake(this);
    this.stepTimeTotal = GameParams.STEP_TIME[this.game.getDifficult()];
    this.stepTimeCounter = this.stepTimeTotal;
    this.gameOver = false;
    this.apples = [];

    this._keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    this._keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this._keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this._keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this._keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  preload() {
    this.load.bitmapFont("snakeFont", "assets/font-snake.png", "assets/font-snake.fnt");
    this.load.spritesheet("snake", SpriteSnake.ASSET, {
      frameWidth: SpriteSnake.WIDTH,
      frameHeight: SpriteSnake.HEIGHT,
    });
  }

  create() {
    let snakeI = 0;
    let snakeJ = 0;

    // Length message
    this.textLength = this.add.bitmapText(16, 16, "snakeFont", "Length: 2", 16);
    this.textLength.setDepth(1);

    // Game Over message
    this.textGameOver = this.add.container(0, 0, [
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 140,
        this.sys.canvas.height / 2 - 120,
        "snakeFont",
        "GAME OVER",
        32,
      ),
      this.add.bitmapText(
        this.sys.canvas.width / 2 - 70,
        this.sys.canvas.height / 2 - 70,
        "snakeFont",
        "Press ESC",
        16,
      ),
    ]);
    this.textGameOver.setDepth(1);
    this.textGameOver.visible = false;

    // Background
    this.add.rectangle(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      this.sys.canvas.width,
      this.sys.canvas.height,
      0xffc107,
    );

    // Walls
    for (let j = 0; j < this.mapHeight; j++) {
      for (let i = 0; i < this.mapWidth; i++) {
        if (this.mapData[j][i] === 1) {
          this.add.rectangle(
            i * this.tileSize + this.tileSize / 2,
            j * this.tileSize + this.tileSize / 2,
            this.tileSize,
            this.tileSize,
            0x795548,
          );
        }
        if (this.mapData[j][i] === 3) {
          snakeI = i;
          snakeJ = j;
        }
      }
    }

    this.snake.create(snakeI, snakeJ);

    for (let k = 0; k < GameParams.APPLE_COUNT[this.game.getDifficult()]; k++) {
      let apple = new Apple(this);
      this.apples.push(apple);
    }
  }

  update(time, dt) {
    if (this._keyEsc.isDown) {
      this.scene.start("SceneMainMenu");
    }

    if (this.gameOver) {
      return;
    }

    // Input player
    if (this._keyUp.isDown) {
      this.snake.setDir(SnakeDir.UP);
    } else if (this._keyDown.isDown) {
      this.snake.setDir(SnakeDir.DOWN);
    } else if (this._keyLeft.isDown) {
      this.snake.setDir(SnakeDir.LEFT);
    } else if (this._keyRight.isDown) {
      this.snake.setDir(SnakeDir.RIGHT);
    }

    // Apples respawn
    for (let apple of this.apples) {
      if (apple.checkSpawn(dt)) {
        let pos = this._getAppleSpawnPos();
        apple.spawn(pos.i, pos.j);
      }
    }

    // Snake step
    this.stepTimeCounter -= dt;
    if (this.stepTimeCounter <= 0) {
      let snakePos = this.snake.getNextPos(this.mapWidth, this.mapHeight);

      // Check collision map
      if (this.mapData[snakePos.j][snakePos.i] === 1) {
        this.gameOver = true;
        this.textGameOver.visible = true;
        return;
      }

      // Check collision apples
      let grow = false;
      for (let apple of this.apples) {
        if (apple.checkEat(snakePos.i, snakePos.j)) {
          apple.eat(GameParams.APPLE_SPAWN_TIME[this.game.getDifficult()]);
          grow = true;
        }
      }

      this.snake.step(grow, this.mapWidth, this.mapHeight);

      if (grow) {
        this.textLength.setText("Length: " + this.snake.getBodyLength());
      }

      // Check collision snake
      if (this.snake.checkCollisionBody()) {
        this.gameOver = true;
        this.textGameOver.visible = true;
        return;
      }

      this.stepTimeCounter = this.stepTimeTotal;
    }
  }

  _getAppleSpawnPos() {
    let i, j;
    let snakeBody = this.snake.getBodyPos();

    while (true) {
      i = Math.floor(Math.random() * this.mapWidth);
      j = Math.floor(Math.random() * this.mapHeight);

      if (this.mapData[j][i] === 1) {
        continue;
      }

      let bodyCollision = false;
      for (let b of snakeBody) {
        if (b.i === i && b.j === j) {
          bodyCollision = true;
          break;
        }
      }
      if (bodyCollision) {
        continue;
      }

      break;
    }

    return { i, j };
  }
}
