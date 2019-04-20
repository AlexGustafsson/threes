const COLUMNS = 12;
const ROWS = 12;
const MIN_RELATIVE_STROKE_WIDTH = 0.003;
const MAX_RELATIVE_STROKE_WIDTH = 0.01;
const MIN_TRANSPARENCY = 0.02;
const MAX_TRANSPARENCY = 0.05;

const {
  utils: {
    rotateAroundCenter
  }
} = require('./common');

// https://freefrontend.com/css-background-patterns/
function generate(username, ctx, random, options) {
  const color1 = random.color();
  const color2 = random.color();

  let diagonal = Math.sqrt((options.width ** 2) + (options.height ** 2));
  const heightDifference = diagonal - options.height;
  diagonal += 2 * heightDifference;
  ctx.lineWidth = random.floatBetween(MIN_RELATIVE_STROKE_WIDTH * diagonal, MAX_RELATIVE_STROKE_WIDTH * diagonal);

  const cellSize = {
    width: diagonal / COLUMNS,
    height: diagonal / ROWS
  };

  const gradient = ctx.createLinearGradient(0, 0, 0, options.height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, options.width, options.height);

  const transparency = random.floatBetween(MIN_TRANSPARENCY, MAX_TRANSPARENCY).toFixed(4);
  const transparentWhite = `rgba(255, 255, 255, ${transparency})`;
  console.log(transparency);
  ctx.strokeStyle = transparentWhite;
  rotateAroundCenter(ctx, 45);
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLUMNS; x++)
      ctx.strokeRect((x * cellSize.width) - heightDifference, (y * cellSize.height) - heightDifference, cellSize.width, cellSize.height);
  }
}

module.exports = generate;
