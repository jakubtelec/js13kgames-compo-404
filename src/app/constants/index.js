export const FIELDS = {
  DEADLY_FIELD: {
    type: "d",
    mv: false,
    defFrame: 9,
    animDefs: {
      always: [9, 10, 11, 12, 13],
    },
  },
  ROCK: { type: "r", mv: false, defFrame: 14, animDefs: {} },
  CODE: { type: "c", mv: true, defFrame: 0, animDefs: {} },
  BOX: { type: "b", mv: true, defFrame: 15, animDefs: {} },
  EXIT: {
    type: "e",
    mv: false,
    defFrame: 16,
    animDefs: { always: [16, 17, 18, 19, 18, 17] },
  },
  INACTIVE_EXIT: {
    type: "i",
    mv: false,
    defFrame: 23,
    animDefs: {},
    // animDefs: { always: [20, 20, 21, 22, 23] },
  },
  PLAYER: {
    type: "p",
    mv: true,
    defFrame: 0,
    animDefs: { always: [0, 1, 2, 3, 4, 5, 6, 7, 8] },
  },
};

export const FIELDS_BY_TYPE = Object.values(FIELDS).reduce(
  (acc, next) => ({ ...acc, [next.type]: next }),
  {}
);

export const KEYMAPS = {
  37: "L",
  38: "U",
  39: "R",
  40: "D",
};

export const DIRECTIONS_MAP = (width, height) => ({
  R: (x, y) => [x + 1 < width ? x + 1 : width - 1, y],
  L: (x, y) => [x - 1 >= 0 ? x - 1 : 0, y],
  U: (x, y) => [x, y - 1 >= 0 ? y - 1 : 0],
  D: (x, y) => [x, y + 1 < height ? y + 1 : height - 1],
});

export const FONT_MAP = `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+-={}().,?!:`;

export const SPEED_DIVIDER = 8,
  SPRITE_SIZE = 16;
