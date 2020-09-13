// screen exits handlers
const retry = (scene) => scene.loadLevel(scene.currentLevel),
  retryWon = (scene) => {
    (scene.currentLevel = scene.currentLevel - 1),
      scene.loadLevel(scene.currentLevel);
  },
  levelMap = (scene) => scene.stateHandlers.levelMap(),
  next = (scene) => {
    scene.loadLevel(scene.currentLevel);
  };

const SCREENS = {
  GAME_OVER: {
    map: [
      "___________",
      "____ccc____",
      "___________",
      "_cccc_cccc_",
      "___________",
      "___c___c___",
      "___e_p_e___",
      "___________",
    ],
    code: [..."404gameover".split(""), "retry", "menu"],
    handlers: [retry, levelMap],
  },
  GAME_START: {
    map: [
      "________________________",
      "_________ccccc__________",
      "________________________",
      "____ccccccc_cccccccc____",
      "_cccc_ccc_ccccc_ccccccc_",
      "________________________",
      "_________p___e__________",
      "________________________",
    ],
    code: [...`byte!deliveryourself(andplsavoiderrors)`.split("")],
    handlers: [levelMap],
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
    handlers: [retryWon, levelMap, next],
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
