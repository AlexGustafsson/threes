const {
  utils: {
    rotateAroundCenter
  }
} = require('./common');

const RELATIVE_STROKE_WIDTH = 0.035;
const RELATIVE_CENTER_WIDTH = 0.33;
const RELATIVE_CENTER_HEIGHT = 0.33;

const COLUMNS = 15;
const ROWS = 15;

// TODO: complete
// From: https://visme.co/blog/geometric-patterns/
function generate(username, ctx, random, options) {
  ctx.lineWidth = RELATIVE_STROKE_WIDTH * options.width;
  const foregroundColor = random.color();
  ctx.strokeStyle = foregroundColor;

  const backgroundColor = random.color();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, options.width, options.height);

  rotateAroundCenter(ctx, random.intBetween(0, 359));

  const horizontalMultiple = Math.round(options.width / COLUMNS);
  const verticalMultiple = Math.round(options.height / ROWS);

  for (let i = 0; i < random.intBetween(5, 15); i++) {
    const x1 = random.intBetween(0, options.width);
    const x2 = random.intBetween(0, options.width);
    const y1 = random.intBetween(0, options.height);
    const y2 = random.intBetween(0, options.height);

    const start = snapToGrid({
      x: Math.min(x1, x2),
      y: Math.min(y1, y2)
    }, options);

    const stop = snapToGrid({
      x: Math.max(x1, x2),
      y: Math.max(y1, y2)
    }, options);

    let {x, y} = start;
    ctx.beginPath();
    ctx.moveTo(x, y);
    while (x < stop.x && y < stop.y) {
      if (random.float() < 0.5)
        x += horizontalMultiple;
      else
        y += verticalMultiple;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  const centerSize = {
    width: RELATIVE_CENTER_WIDTH * options.width,
    height: RELATIVE_CENTER_HEIGHT * options.height
  };

  const centerPosition = {
    x: (options.width / 2) - (centerSize.width / 2),
    y: (options.height / 2) - (centerSize.height / 2)
  };

  ctx.fillRect(centerPosition.x, centerPosition.y, centerSize.width, centerSize.height);
  ctx.strokeRect(centerPosition.x, centerPosition.y, centerSize.width, centerSize.height);
}

function snapToGrid(position, size) {
  const horizontalMultiple = Math.round(size.width / COLUMNS);
  const verticalMultiple = Math.round(size.height / ROWS);
  return {
    x: Math.ceil(position.x / horizontalMultiple) * horizontalMultiple,
    y: Math.ceil(position.y / verticalMultiple) * verticalMultiple
  };
}

module.exports = generate;
