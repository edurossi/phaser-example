export const SnakeDir = {
  NONE: 0,
  LEFT: 1,
  RIGHT: 2,
  UP: 3,
  DOWN: 4,

  OPPOSITE: dir => {
    if (dir === SnakeDir.LEFT) {
      return SnakeDir.RIGHT;
    } else if (dir === SnakeDir.RIGHT) {
      return SnakeDir.LEFT;
    } else if (dir === SnakeDir.UP) {
      return SnakeDir.DOWN;
    } else if (dir === SnakeDir.DOWN) {
      return SnakeDir.UP;
    }
    return 0;
  },
};
