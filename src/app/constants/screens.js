// screen exits handlers
const retry = (scene) => scene.loadLevel(scene.currentLevel),
  levelMap = (scene) => scene.stateHandlers.levelMap(),
  next = (scene) => {
    scene.loadLevel(scene.currentLevel);
  };

const SCREENS = {
  GAME_OVER: {
    map: [
      "___________",
      "_cccc_cccc_",
      "___c___c___",
      "___e_p_e___",
      "___________",
    ],
    code: [..."gameover".split(""), "retry", "menu"],
    handlers: [retry, levelMap],
  },

  LEVEL_FINISHED: {
    map: [
      "___________",
      "___ccccc___",
      "_ccccccccc_",
      "___________",
      "__c_c___c__",
      "__e_e_p_e__",
      "___________",
      "___________",
    ],
    code: [..."levelfinished!".split(""), "retry", "menu", "next"],
    handlers: [retry, levelMap, next],
  },
  GAME_FINISHED: {
    map: [
      "__________________",
      "_cccccccccccccccc_",
      "__cccc_ccccccccc__",
      "_________c________",
      "_______p_e________",
      "__________________",
    ],
    code: [..."congratulations!datadelivered".split(""), "menu"],
    handlers: [levelMap],
  },
};

export default SCREENS;
