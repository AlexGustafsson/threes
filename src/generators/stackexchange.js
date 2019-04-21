const {
  utils: {
    rotateAroundCenter
  }
} = require('./common');

const ROWS = 3;
const COLUMNS = 3;
const MIN_SHAPE_POINTS = 3;
const MAX_SHAPE_POINTS = 9;

function generate(username, ctx, random, options) {
  const cellSize = {
    width: options.width / COLUMNS,
    height: options.height / ROWS
  };

  const backgroundColor = '#F7F7F7';
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, options.width, options.height);

  const color = random.color();

  const cornerShape = randomShape(random);
  const sideShape = randomShape(random);
  const midShape = randomShape(random);

  ctx.fillStyle = color;
  for (let i = 0; i < 4; i++) {
    rotateAroundCenter(ctx, 90 * i);
    drawShape(ctx, cellSize, {x: 0, y: 0}, cornerShape);
    drawShape(ctx, cellSize, {x: cellSize.width, y: 0}, sideShape);
  }
  drawShape(ctx, cellSize, {x: cellSize.width, y: cellSize.height}, midShape);
}

function randomShape(random) {
  const points = random.intBetween(MIN_SHAPE_POINTS, MAX_SHAPE_POINTS);
  const shape = [];

  for (let i = 0; i < points; i++)
    shape.push({x: random.floatBetween(-1, 2), y: random.floatBetween(-1, 2)});

  return shape;
}

function clip(rect, point) {
  return {
    x: Math.max(Math.min(point.x, rect.x + rect.width), rect.x),
    y: Math.max(Math.min(point.y, rect.y + rect.height), rect.y)
  };
}

function drawShape(ctx, size, position, shape) {
  ctx.beginPath();
  for (let i = 0; i < shape.length; i++) {
    const unclipped = {
      x: (shape[i].x * size.width) + position.x,
      y: (shape[i].y * size.height) + position.y
    };
    const clipped = clip({...position, ...size}, unclipped);
    if (i === 0)
      ctx.moveTo(clipped.x, clipped.y);
    else
      ctx.lineTo(clipped.x, clipped.y);
  }
  ctx.fill();
}

module.exports = generate;
