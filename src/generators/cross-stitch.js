const RELATIVE_MIN_WIDTH = 0.025;
const RELATIVE_MAX_WIDTH = 0.05;
const RELATIVE_MIN_SPACE = 0.05;
const RELATIVE_MAX_SPACE = 0.08;
const MIN_STITCHES = 10;
const MAX_STITCHES = 20;

const {
  utils: {
    rotateAroundCenter
  }
} = require('./common');

function generate(username, ctx, random, options) {
  const color1 = random.color();
  const color2 = random.color();

  const diagonal = Math.sqrt((options.width ** 2) + (options.height ** 2));
  const heightDifference = diagonal - options.height;

  const gradient = ctx.createLinearGradient(0, 0, 0, options.height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, options.width, options.height);

  const stitches = [];
  const stichesCount = random.floatBetween(MIN_STITCHES, MAX_STITCHES);
  for (let i = 0, previousX = -heightDifference; i < stichesCount; i++) {
    const space = random.floatBetween(RELATIVE_MIN_SPACE * diagonal, RELATIVE_MAX_SPACE * diagonal);
    const width = random.floatBetween(RELATIVE_MIN_WIDTH * diagonal, RELATIVE_MAX_WIDTH * diagonal);

    stitches.push({
      x: previousX + space,
      y: -heightDifference,
      width,
      height: diagonal + (2 * heightDifference)
    });

    previousX += space + width;
  }

  const transparentWhite = 'rgba(255, 255, 255, 0.6)';
  ctx.fillStyle = transparentWhite;
  rotateAroundCenter(ctx, 45);
  drawStitches(ctx, stitches);
  rotateAroundCenter(ctx, -45);
  drawStitches(ctx, stitches);
}

function drawStitches(ctx, stitches) {
  for (const stitch of stitches)
    ctx.fillRect(stitch.x, stitch.y, stitch.width, stitch.height);
}

module.exports = generate;
