// general helpers

export const waitForImages = (images, handler) => {
  let loaded = 0;
  images.forEach(
    (img) =>
      (img.onload = () => {
        loaded++;
        if (loaded === images.length) handler();
      })
  );
};

export const rndInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const isInRange = (n, target, range) =>
  n >= target - range || n <= target + range;

export const calcPos = (source, target, delta, speed) => {
  const step = speed * delta;
  return source < target - step
    ? source + step
    : source > target + step
    ? source - step
    : target;
};

// image data manipulation tools

let cnvs = document.createElement("canvas"),
  cCtx = cnvs.getContext("2d");

const imageToData = (img) => {
  cnvs.width = img.width;
  cnvs.height = img.height;
  cCtx.drawImage(img, 0, 0);
  return cCtx.getImageData(0, 0, img.width, img.height);
};

const imagedataToImage = (imagedata) => {
  cnvs.width = imagedata.width;
  cnvs.height = imagedata.height;
  cCtx.putImageData(imagedata, 0, 0);
  var image = new Image();
  image.src = cnvs.toDataURL();
  return image;
};

const swapColorData = (imagedata, oldRgb, newRgb) => {
  for (let i = 0; i < imagedata.data.length; i += 4) {
    if (
      imagedata.data[i] === oldRgb[0] &&
      imagedata.data[i + 1] === oldRgb[1] &&
      imagedata.data[i + 2] === oldRgb[2]
    );
    {
      imagedata.data[i] = newRgb[0];
      imagedata.data[i + 1] = newRgb[1];
      imagedata.data[i + 2] = newRgb[2];
    }
  }
  return imagedata;
};

const glitchColorData = (
  imagedata,
  { move, color, start, length, fuzz, remove, sin },
  width
) => {
  let realStep = move * -4;
  for (
    let i = start;
    i <
    (start + length > imagedata.data.length
      ? imagedata.data.length
      : start + length);
    i += 4
  ) {
    let mod = sin ? Math.floor(Math.sin(i / 16 / width) * 40) : 0;
    if (fuzz) realStep += 5 - rndInt(0, 2);
    if (imagedata.data[i] || imagedata.data[i + 1] || imagedata.data[i + 2]) {
      if (remove) {
        imagedata.data[i] = imagedata.data[i + 1] = imagedata.data[i + 2] = 0;
      }
      const [r, g, b] = color;
      imagedata.data[i + realStep + mod] = r;
      imagedata.data[i + 1 + realStep + mod] = g;
      imagedata.data[i + 2 + realStep + mod] = b;
    }
  }
  return imagedata;
};

export const swapColors = (image, oldRgb, newRgb) =>
  imagedataToImage(swapColorData(imageToData(image), oldRgb, newRgb));

export const glitchColors = (image) =>
  imagedataToImage(glitchColorData(imageToData(image)));

export const glitchCanvas = (canvas, ctx, glitchDef) => {
  ctx.putImageData(
    glitchColorData(
      ctx.getImageData(0, 0, canvas.width, canvas.height),
      glitchDef,
      canvas.width
    ),
    0,
    0
  );
};

// level selector screengenerator

const setField = (x, y, v, map) => {
  map[y] = map[y]
    .split("")
    .map((val, i) => (i === x ? v : val))
    .join("");
};

export const getLevelsScreen = (levels, { currentLevel, getLastestLevel }) => {
  const line = "____________",
    map = [line, "___cccccc___", "___cccccc___", line],
    code = [..."selectlevel:"],
    handlers = [];
  for (let i = 0; i < Math.ceil(levels.length / 4) * 3; i++) {
    map.push(line);
  }
  levels.forEach((l, idx) => {
    const lY = Math.ceil((idx + 1) / 4) * 3 + 1,
      lX = (idx % 4) * 3 + 1;
    setField(lX, lY, "c", map); // letter
    // if (idx < /*getLastestLevel() + 1 */ 1000) {
    if (idx < getLastestLevel() + 1) {
      setField(lX, lY + 1, "e", map);
      handlers.push((scene) => scene.loadLevel(idx));
    } else {
      setField(lX, lY + 1, "i", map); // closed exit
    }
    idx === currentLevel &&
      setField(lX < 4 ? lX + 1 : lX - 1, lY + 1, "p", map);
    code.push(String(idx + 1));
  });

  return {
    map,
    code,
    handlers,
  };
};
