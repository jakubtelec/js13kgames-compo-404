import { FONT_MAP } from "../../constants";

const CanvasEngine = function () {
  const DEF_DURATION = 1000 / 60;
  let last_upd = Date.now();
  this.el = {};
  this.ctx = {};
  this.paintFrame = () => {};
  this.paintSprite = ({
    sheet,
    x,
    y,
    n,
    spriteXSize,
    spriteYSize,
    fieldXSize,
    fieldYSize,
  }) => {
    fieldYSize = fieldYSize || fieldXSize;
    spriteYSize = spriteYSize || spriteXSize;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(
      sheet,
      n * spriteXSize,
      0,
      spriteXSize,
      spriteYSize,
      x,
      y,
      fieldXSize,
      fieldYSize
    );
  };
  this.paintText = (x, y, text, width, sheet, separation) => {
    separation = separation || width / 3;
    let letterX = x;
    for (let letter of text) {
      this.paintSprite({
        sheet,
        x: letterX,
        y,
        n: FONT_MAP.indexOf(letter.toUpperCase()),
        spriteXSize: 3,
        spriteYSize: 5,
        fieldXSize: width,
        fieldYSize: (width * 5) / 3,
      });
      letterX += width + separation;
    }
  };
  this.loop = (delta) => {
    const now = Date.now();
    this.paintFrame(delta);
    const newDelta = (now - last_upd) / DEF_DURATION;
    last_upd = now;
    this.loopId = requestAnimationFrame(() => this.loop(newDelta));
  };
  this.init = (id, width = 300, height = 300) => {
    this.el = document.getElementById(id);
    this.ctx = this.el.getContext("2d");
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  };
  this.resize = (width, height) => {
    this.ctx.canvas.width = width;
    this.ctx.canvas.height = height;
  };
  this.setup = () => {};
  this.finish = () => {};
  this.start = function () {
    this.setup();
    requestAnimationFrame(() => this.loop(1));
  };
  this.stop = function () {
    this.loopId = cancelAnimationFrame(this.loopId);
    this.finish();
  };
};

export default CanvasEngine;
