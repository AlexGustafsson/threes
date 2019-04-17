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

  drawFullSquare(ctx, random, {
    left: random.float() * options.width,
    top: random.float() * options.height,
    width: 50,
    height: 50
  });

  drawComplementarySquare(ctx, random, {
    left: random.float() * options.width,
    top: random.float() * options.height,
    width: 50,
    height: 50
  });

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

module.exports = {
  generate
};
