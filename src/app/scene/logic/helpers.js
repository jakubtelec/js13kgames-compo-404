import { FIELDS } from "../../constants";

const { CODE } = FIELDS;

const getField = (fields, idx) =>
  fields.find((field) => field.x === idx) || {} || {};

export const stitchCode = (fields, width) => {
  let last = {};
  let code = "";
  for (let idx = 0; idx < width; idx++) {
    const [field, next] = [getField(fields, idx), getField(fields, idx + 1)];
    if (field.type === CODE.type) {
      code += ` ${field.val}`;
    } else if (field.type && [last.type, next.type].includes(CODE.type)) {
      code = `${code} this.objectsMap["${field.type}"]`;
    }
    last = field;
  }
  if (code) code = code.trim() + ";\n";
  return code;
};

export const Item = function ({ x, y, ...rest }) {
  this.x = x || 0;
  this.y = y || 0;
  Object.assign(this, rest);
  this.animations = {};
  this.startAnim = function (type, speed = 50) {
    if (!this.animDefs[type]) return;
    const frames = this.animDefs[type];
    let index = 0;
    if (!this.animations[type])
      this.animations[type] = setInterval(() => {
        this.frame = frames[index];
        index = index === frames.length - 1 ? 0 : index + 1;
      }, speed);
  };
  this.stopAnim = function (type) {
    if (this.animations[type])
      this.animations[type] = clearInterval(this.animations[type]);
  };
  // cleans up visual state of item
  this.resetState = function () {
    this.frame = this.defFrame;
    Object.keys(this.animations).forEach((anim) => this.stopAnim(anim));
  };
};
