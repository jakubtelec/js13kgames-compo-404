import CanvasEngine from "./engine";
import GameLogic from "./logic";
import {
  calcPos,
  swapColors,
  glitchCanvas,
  isInRange,
  waitForImages,
  getLevelsScreen,
  rndInt,
} from "./helpers";
import { FIELDS, FIELDS_BY_TYPE, SPEED_DIVIDER } from "../constants";
import { spritesheet, font } from "../../assets/sprites";

const { CODE, EXIT } = FIELDS;

const Scene = function (levels, screens) {
  //
  // local storage managment
  //
  this.getLastestLevel = () =>
    parseInt(localStorage.getItem("last_level") || 0);

  this.lastLevel = this.getLastestLevel();
  this.currentLevel = this.getLastestLevel();
  //
  // prepare canvas engine
  //
  this.engine = new CanvasEngine();
  //
  // generate levels screen
  //
  screens.LEVELS_MAP = getLevelsScreen(levels, this);
  //
  // state handlers (bit reactish:)
  //
  this.stateHandlers = {
    gameOver: () => this.loadLevel(screens.GAME_OVER),
    levelFinished: () => this.loadLevel(screens.WON),
    levelMap: () => this.loadLevel(screens.LEVELS_MAP),
  };

  //
  // gameloop -> stiches logic with display
  //
  this.engine.paintFrame = (delta) => {
    this.delta = delta;
    const {
      ctx,
      ctx: {
        canvas: { width, height },
      },
    } = this.engine;
    // cleanup
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, width, height);
    ctx.fill();
    // paint items
    for (const item of [...this.gameLogic.pool]) this.paintItem(item);
    // GLITCH
    // GLITCH LOGIC HEREEEE !
    if (glitched) glitchCanvas(this.engine.ctx.canvas, ctx, glitchDef);
  };

  //
  // glitcher
  //

  let glitched = false;
  let glitchDef = {};

  this.glitch = () => {
    glitched = true;
    glitchDef = {
      move: rndInt(20, 60),
      color: [rndInt(0, 255), 0, 255],
      start:
        rndInt(0, this.engine.ctx.canvas.height) *
        this.engine.ctx.canvas.width *
        4,
      length:
        rndInt(0, this.engine.ctx.canvas.height) *
        this.engine.ctx.canvas.width *
        3,
      fuzz: !rndInt(0, 4),
      remove: !rndInt(0, 3),
      sin: !rndInt(0, 4),
    };
    setTimeout(() => {
      glitched = false;
      glitchDef = {};
      setTimeout(this.glitch, rndInt(200, 1000));
    }, rndInt(200, 300));
  };

  //
  // recalc field size (= board size) and movement speed
  //
  this.recalcSize = () => {
    this.fieldSize = Math.floor(
      (0.8 * Math.min(window.innerWidth, window.innerHeight)) /
        Math.max(this.width, this.height)
    );
    this.moveSpeed = this.fieldSize / SPEED_DIVIDER;
  };
  //
  // load level
  //
  this.loadLevel = (level) => {
    if (typeof level === "number") {
      this.currentLevel = level;
      level = levels[level];
      screens.LEVELS_MAP = getLevelsScreen(levels, this);
    }
    const { map, code } = level,
      handlers = level.handlers || [];
    this.height = map.length;
    this.width = map[0].length;
    if (this.gameLogic) this.gameLogic.dispose();
    this.gameLogic = new GameLogic(this);
    // load level data from tables
    let cCounter = 0,
      hCounter = 0;
    for (let y = 0; y < this.height; y++)
      for (let x = 0; x < this.width; x++) {
        const item = map[y][x];
        if (item !== "_") {
          if (item === "c") {
            this.gameLogic.addItem(x, y, CODE, code[cCounter]);
            cCounter++;
          } else {
            const itemDef = FIELDS_BY_TYPE[item];
            if (item === EXIT.type) {
              itemDef.handler = handlers[hCounter];
              hCounter++;
            }
            this.gameLogic.addItem(x, y, itemDef);
          }
        }
      }
    // init canvas
    this.recalcSize();
    this.engine.init(
      "canvas",
      this.width * this.fieldSize,
      this.height * this.fieldSize
    );
  };
  //
  // paint item from spritesheet
  //
  this.paintItem = (item) => {
    const { x, y, lastX, lastY } = item;
    const targetX = x * this.fieldSize,
      targetY = y * this.fieldSize,
      realX = calcPos(lastX, targetX, this.delta, this.moveSpeed),
      realY = calcPos(lastY, targetY, this.delta, this.moveSpeed);
    if (item.type === CODE.type) this.paintCode(realX, realY, item.val);
    else {
      this.engine.paintSprite({
        sheet: spritesheet,
        x: realX,
        y: realY,
        n: item.frame,
        spriteXSize: 16,
        fieldXSize: this.fieldSize,
      });
    }
    // if (realX === targetX && realY === targetY && item.animations.move) {
    //   item.stopAnim("move");
    //   item.frame = item.defFrame;
    // }
    if (
      isInRange(realX, targetX, this.moveSpeed * 2) &&
      isInRange(realY, targetY, this.moveSpeed * 2)
    )
      this.gameLogic.interactive = true;
    item.lastX = realX;
    item.lastY = realY;
  };
  //
  // gracefully show text in field
  //
  this.paintCode = (x, y, code) => {
    const width =
        code.length === 1
          ? 0.5 * this.fieldSize
          : (this.fieldSize / code.length) * 0.8,
      height = (width * 5) / 4,
      xShift = (this.fieldSize - width * code.length) / 2,
      yShift = (this.fieldSize - height) / 2;
    this.engine.paintText(
      x + xShift,
      y + yShift,
      code,
      width / 1.33,
      this.greyFont
    );
  };
  //
  // game start
  //
  this.run = () => {
    // this.loadLevel(5);
    this.loadLevel(screens.LEVELS_MAP);
    waitForImages([spritesheet, font], () => {
      // make coloured font for code
      this.greyFont = swapColors(font, [255, 255, 255], [128, 128, 128]);
      window.addEventListener("resize", () => {
        this.recalcSize();
        this.engine.resize(
          this.width * this.fieldSize,
          this.height * this.fieldSize
        );
      });
      this.engine.start();
      this.glitch();
    });
  };
};

export default Scene;
