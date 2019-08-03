import { SpriteSnake } from "../const/sprite-snake";
import { SnakeDir } from "../const/snake-dir";

export default class Snake {
  constructor(scene) {
    this.scene = scene;
    this.body = [];
    this.dir = SnakeDir.RIGHT;
    this.nextDir = SnakeDir.RIGHT;
  }

  create(i, j) {
    this.body = [];

    this.body.push({
      i: i,
      j: j,
      prevDir: this.dir,
      dir: this.dir,
      sprite: this.scene.add.sprite(0, 0, "snake", 0),
    });
    this.body.push({
      i: i - 1,
      j: j,
      prevDir: this.dir,
      dir: this.dir,
      sprite: this.scene.add.sprite(0, 0, "snake", 0),
    });

    for (let k = 0; k < this.body.length; k++) {
      this._updateBodySprite(k);
    }
  }

  getBodyPos() {
    return this.body.map(b => {
      return { i: b.i, j: b.j };
    });
  }

  getBodyLength() {
    return this.body.length;
  }

  getNextPos(mapWidth, mapHeight) {
    let di = 0;
    let dj = 0;
    if (this.nextDir === SnakeDir.RIGHT) {
      di = 1;
    } else if (this.nextDir === SnakeDir.LEFT) {
      di = -1;
    } else if (this.nextDir === SnakeDir.UP) {
      dj = -1;
    } else if (this.nextDir === SnakeDir.DOWN) {
      dj = 1;
    }
    let i = (this.body[0].i + di + mapWidth) % mapWidth;
    let j = (this.body[0].j + dj + mapHeight) % mapHeight;
    return { i, j };
  }

  checkCollisionBody() {
    let head = this.body[0];

    for (let k = 1; k < this.body.length; k++) {
      if (this.body[k].i === head.i && this.body[k].j === head.j) {
        return true;
      }
    }
    return false;
  }

  setDir(dir) {
    if (this.dir === SnakeDir.OPPOSITE(dir)) {
      return;
    }
    this.nextDir = dir;
  }

  step(grow, mapWidth, mapHeight) {
    let nextPos = this.getNextPos(mapWidth, mapHeight);
    let oldBodyLength = this.body.length; // used to avoid iterate on the grow part

    if (grow) {
      this.body.push({
        i: this.body[oldBodyLength - 1].i,
        j: this.body[oldBodyLength - 1].j,
        prevDir: this.body[oldBodyLength - 1].prevDir,
        dir: this.body[oldBodyLength - 1].dir,
        sprite: this.scene.add.sprite(0, 0, "snake", 0),
      });
      this._updateBodySprite(oldBodyLength);
    }

    // Set the new dir - used to update the body
    this.body[0].dir = this.nextDir;

    // Update the body
    for (let k = oldBodyLength - 1; k > 0; k--) {
      this.body[k].i = this.body[k - 1].i;
      this.body[k].j = this.body[k - 1].j;
      this.body[k].prevDir = this.body[k].dir;
      this.body[k].dir = this.body[k - 1].dir;
      this._updateBodySprite(k);
    }

    // Update the head
    this.body[0].i = nextPos.i;
    this.body[0].j = nextPos.j;
    this.body[0].prevDir = this.dir;
    this._updateBodySprite(0);

    this.dir = this.nextDir;
  }

  _updateBodySprite(bodyIndex) {
    this.body[bodyIndex].sprite.x = this.body[bodyIndex].i * SpriteSnake.WIDTH + SpriteSnake.WIDTH / 2;
    this.body[bodyIndex].sprite.y = this.body[bodyIndex].j * SpriteSnake.HEIGHT + SpriteSnake.HEIGHT / 2;
    if (bodyIndex === 0) {
      this.body[bodyIndex].sprite.setFrame(SpriteSnake.HEAD[this.nextDir]);
    } else if (bodyIndex === this.body.length - 1) {
      this.body[bodyIndex].sprite.setFrame(SpriteSnake.TAIL[this.body[bodyIndex].dir]);
    } else {
      this.body[bodyIndex].sprite.setFrame(SpriteSnake.BODY[this.body[bodyIndex].prevDir][this.body[bodyIndex].dir]);
    }
  }
}
