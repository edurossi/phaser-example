import { SnakeDir } from "./snake-dir";

const HEAD = {};
HEAD[SnakeDir.LEFT] = 8;
HEAD[SnakeDir.RIGHT] = 4;
HEAD[SnakeDir.UP] = 3;
HEAD[SnakeDir.DOWN] = 9;

const TAIL = {};
TAIL[SnakeDir.LEFT] = 18;
TAIL[SnakeDir.RIGHT] = 14;
TAIL[SnakeDir.UP] = 13;
TAIL[SnakeDir.DOWN] = 19;

const BODY = {};
BODY[SnakeDir.LEFT] = {}
BODY[SnakeDir.LEFT][SnakeDir.LEFT] = 1;
BODY[SnakeDir.LEFT][SnakeDir.UP] = 5;
BODY[SnakeDir.LEFT][SnakeDir.DOWN] = 0;
BODY[SnakeDir.RIGHT] = {};
BODY[SnakeDir.RIGHT][SnakeDir.RIGHT] = 1;
BODY[SnakeDir.RIGHT][SnakeDir.UP] = 12;
BODY[SnakeDir.RIGHT][SnakeDir.DOWN] = 2;
BODY[SnakeDir.UP] = {};
BODY[SnakeDir.UP][SnakeDir.LEFT] = 2;
BODY[SnakeDir.UP][SnakeDir.RIGHT] = 0;
BODY[SnakeDir.UP][SnakeDir.UP] = 7;
BODY[SnakeDir.DOWN] = {};
BODY[SnakeDir.DOWN][SnakeDir.LEFT] = 12;
BODY[SnakeDir.DOWN][SnakeDir.RIGHT] = 5;
BODY[SnakeDir.DOWN][SnakeDir.DOWN] = 7;

export const SpriteSnake = {
  ASSET: "assets/snake.png",

  WIDTH: 64,
  HEIGHT: 64,

  HEAD,
  TAIL,
  BODY,
  APPLE: 15,
};
