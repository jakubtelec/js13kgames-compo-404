// screen exits handlers
const retry = (scene) => scene.loadLevel(scene.currentLevel),
  levelMap = (scene) => scene.stateHandlers.levelMap(),
  next = (scene) => {
    scene.currentLevel++;
    if (scene.currentLevel < scene.getLastestLevel())
      localStorage.setItem("last_level", scene.currentLevel);
    scene.loadLevel(scene.currentLevel);
  };

export const GAME_OVER = {
  map: [
    "___________",
    "_cccc_cccc_",
    "___c___c___",
    "___e_p_e___",
    "___________",
  ],
  code: [..."gameover".split(""), "retry", "menu"],
  handlers: [retry, levelMap],
};

export const WON = {
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
};
