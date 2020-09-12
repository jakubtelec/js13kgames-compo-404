import {
  FIELDS,
  FIELDS_BY_TYPE,
  DIRECTIONS_MAP,
  KEYMAPS,
} from "../../constants";
import { stitchCode, Item } from "./helpers";

const { CODE, PLAYER, EXIT, DEADLY_FIELD } = FIELDS;

const GameLogic = function (scene) {
  const { width, height, fieldSize, stateHandlers } = scene;
  //
  // GENERAL VARIABLES
  //
  this.interactive = true;
  this.finished = false;
  this.gameOver = false;
  // items pool
  this.pool = new Set();
  // directions map => movement policy for given board dimensions
  this.directionsMap = DIRECTIONS_MAP(width, height);
  // map of objects references => used when swapping objects
  this.objectsMap = { ...FIELDS_BY_TYPE };
  // main key listener

  const kListener = (e) => {
    const { keyCode } = e;
    if (KEYMAPS[keyCode]) this.movePlayers(KEYMAPS[keyCode]);
    if (keyCode == 27) stateHandlers.gameOver();
  };

  window.addEventListener("keydown", kListener, false);
  //
  // POOL TOOLS
  //
  // getter
  this.getItem = function (x, y) {
    return [...this.pool].find((obj) => obj.x === x && obj.y === y) || {};
  };
  // setter
  this.addItem = function (x, y, def, v) {
    const item = new Item({
      x,
      y,
      lastX: x * fieldSize,
      lastY: y * fieldSize,
      ...def,
      frame: def.defFrame,
      val: v,
    });
    item.startAnim("always", 60);
    this.pool.add(item);
    return item;
  };
  //
  // MOVEMENTS
  //
  // push objects
  this.moveObj = function (item, direction) {
    const { mv, x, y, type } = item,
      isPlayer = type === PLAYER.type;
    let moveable = false;

    if (mv) {
      moveable = true;
      const [newX, newY] = this.directionsMap[direction](x, y);
      if (newX === x && newY === y) return false;
      const neighbour = this.getItem(newX, newY);
      // special rules for player object
      if (isPlayer && neighbour) {
        if (neighbour.type === DEADLY_FIELD.type) {
          this.gameOver = true;
        }
        if (neighbour.type === EXIT.type) {
          if (neighbour.handler) {
            neighbour.handler(scene);
          } else {
            this.finished = true;
          }
        }
      }
      if (neighbour && neighbour.type)
        moveable = this.moveObj(neighbour, direction);
      if (moveable) {
        this.interactive = false;
        item.x = newX;
        item.y = newY;
      }
    }
    if (item.type === PLAYER.type && item.untouched) {
      item.untouched = false;
      // item.startAnim("move", 50);
    }
    return moveable;
  };
  // move players (in fact special case of pushing objects):
  this.movePlayers = (direction) => {
    if (this.interactive) {
      const players = [...this.pool]
        .filter(({ type }) => type === PLAYER.type)
        .map((player) => {
          // move only players non moved by different objects
          player.untouched = true;
          return player;
        });
      for (const player of players) {
        if (!player.untouched) continue;
        this.moveObj(player, direction);
        player.untouched = false;
      }
    }
    // finish level - but only if no player object is lost
    if (this.gameOver) {
      stateHandlers.gameOver();
    } else if (this.finished) {
      stateHandlers.levelFinished();
    }
    this.execute();
  };
  // extract, fix and
  // execute level code from level objects
  this.execute = function () {
    let code = "";
    for (let line = 0; line < height; line++)
      code += stitchCode(
        [...this.pool].filter((item) => item.y === line),
        width
      );

    if (code.length)
      try {
        // console.log(code);
        eval(code);
        this.remap();
      } catch (e) {
        // console.log(e);
      }
  };
  // remaps level according to objectsMap scheme
  // (should be done after each successful code execution)
  this.remap = function () {
    [...this.pool].forEach((field) => {
      if (
        this.objectsMap[field.type] !== CODE &&
        field.type !== this.objectsMap[field.type].type
      ) {
        Object.assign(field, this.objectsMap[field.type]);
        field.resetState();
        field.startAnim("always", 60);
      }
    });
  };
  // dispose level's logic
  this.dispose = () => {
    [...this.pool].forEach((item) => item.resetState());
    window.removeEventListener("keydown", kListener, false);
  };
};

export default GameLogic;
