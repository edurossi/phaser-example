const DIFFICULT_EASY = 1;
const DIFFICULT_MEDIUM = 2;
const DIFFICULT_HARD = 3;

const STEP_TIME = {};
STEP_TIME[DIFFICULT_EASY] = 500;
STEP_TIME[DIFFICULT_MEDIUM] = 375;
STEP_TIME[DIFFICULT_HARD] = 250;

const APPLE_SPAWN_TIME = {};
APPLE_SPAWN_TIME[DIFFICULT_EASY] = 1000;
APPLE_SPAWN_TIME[DIFFICULT_MEDIUM] = 2000;
APPLE_SPAWN_TIME[DIFFICULT_HARD] = 4000;

const APPLE_COUNT = {};
APPLE_COUNT[DIFFICULT_EASY] = 4;
APPLE_COUNT[DIFFICULT_MEDIUM] = 3;
APPLE_COUNT[DIFFICULT_HARD] = 2;

export const GameParams = {
  DIFFICULT_EASY,
  DIFFICULT_MEDIUM,
  DIFFICULT_HARD,

  STEP_TIME,
  APPLE_SPAWN_TIME,
  APPLE_COUNT,
};
