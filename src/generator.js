const debug = require('debug')('threes:generator');
const {createCanvas} = require('canvas');

const Random = require('./random');

async function generate(username, options) {
  debug(`Generating avatar for ${username}`);

  options = Object.assign({
    format: null,
    width: 320,
    height: 320
  }, options);

  const canvas = createCanvas(options.width, options.height, options.format);
  const ctx = canvas.getContext('2d');
  const random = new Random(username);

  const wantedWidth = 50;
  const wantedHeight = 50;

  const columns = Math.floor(options.width / wantedWidth);
  const rows = Math.floor(options.height / wantedHeight);

  const width = options.width / columns;
  const height = options.height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const shapeOptions = {
        left: x * width,
        top: y * height,
        width,
        height
      };

      const value = random.float();
      if (value < 0.3)
        drawFullSquare(ctx, random, shapeOptions);
      else if (value < 0.6)
        drawComplementarySquare(ctx, random, shapeOptions);
      else
        drawStripedTriangle(ctx, random, shapeOptions);
    }
  }

  return canvas;
}

function drawFullSquare(ctx, random, {left, top, width, height}) {
  const color = random.color();

  ctx.fillStyle = color;
  ctx.fillRect(left, top, width, height);
}

function drawComplementarySquare(ctx, random, {left, top, width, height}) {
  const color1 = random.color();
  const color2 = random.color();

  ctx.fillStyle = color1;
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left, top + height);
  ctx.lineTo(left + width, top + height);
  ctx.fill();

  ctx.fillStyle = color2;
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left + width, top);
  ctx.lineTo(left + width, top + height);
  ctx.fill();
}

function drawStripedTriangle(ctx, random, {left, top, height}) {
  const color = random.color();

  const stripeHeight = 5;
  const stripeSpace = stripeHeight;
  let stripes = 0;
  for (; (stripes * stripeHeight) + ((stripes - 1) * stripeSpace) < height; stripes++);

  for (let i = 0; i < stripes; i++) {
    const topLeft = {x: 0, y: (i * (stripeHeight + stripeSpace))};
    const topRight = {x: topLeft.y, y: topLeft.y};
    const bottomLeft = {x: 0, y: topLeft.y + stripeHeight};
    const bottomRight = {x: bottomLeft.y, y: bottomLeft.y};

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(topLeft.x + left, topLeft.y + top);
    ctx.lineTo(topRight.x + left, topRight.y + top);
    ctx.lineTo(bottomRight.x + left, bottomRight.y + top);
    ctx.lineTo(bottomLeft.x + left, bottomLeft.y + top);
    ctx.fill();
  }
}

module.exports = {
  generate
};
