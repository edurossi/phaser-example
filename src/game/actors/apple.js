import { SpriteSnake } from "../const/sprite-snake";

export default class Apple {
  constructor(scene) {
    this.scene = scene;
    this.pos = { i: 0, j: 0 };
    this.enable = false;
    this.spawnCounter = 0;

    this.sprite = this.scene.add.sprite(0, 0, "snake", SpriteSnake.APPLE);
  }

  getPos() {
    return this.pos;
  }

  checkEat(i, j) {
    if (!this.enable) {
      return false;
    }

    if (this.pos.i === i && this.pos.j === j) {
      return true;
    }
    return false;
  }

  eat(spawnTimer) {
    this.enable = false;
    this.sprite.visible = false;
    this.spawnCounter = spawnTimer;
  }

  checkSpawn(dt) {
    if (this.enable) {
      return false;
    }

    this.spawnCounter -= dt;
    if (this.spawnCounter <= 0) {
      return true;
    }
    return false;
  }

  spawn(i, j) {
    this.pos = {i, j};
    this.enable = true;
    this.sprite.visible = true;
    this._updateSprite();
  }

  _updateSprite() {
    this.sprite.x = this.pos.i * SpriteSnake.WIDTH + SpriteSnake.WIDTH / 2;
    this.sprite.y = this.pos.j * SpriteSnake.HEIGHT + SpriteSnake.HEIGHT / 2;
  }
}
