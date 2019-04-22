const {
  utils: {
    rotateAroundCenter
  }
} = require('./common');

const COLUMNS = 3;
const ROWS = 3;
const MIN_STRIPES = 4;
const MAX_STRIPES = 8;

// https://freefrontend.com/css-background-patterns/
async function generate(username, ctx, random, options) {
  const wantedWidth = Math.floor(1 / COLUMNS * options.width);
  const wantedHeight = Math.floor(1 / ROWS * options.height);

  const columns = Math.floor(options.width / wantedWidth);
  const rows = Math.floor(options.height / wantedHeight);

  const cellSize = {
    width: Math.round((options.width) / columns),
    height: Math.round((options.height) / rows)
  };

  const backgroundColor = '#F7F7F7';
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, options.width, options.height);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      ctx.resetTransform();
      ctx.translate(x * cellSize.width, y * cellSize.height);
      /*const angle = random.element(0, 90, 180, 270);
      rotateAroundCenter(ctx, angle);
      if (angle === 90)
        ctx.translate(options.width - ((x + 1) * cellSize.width), y * cellSize.height);
      else if (angle === 180)
        ctx.translate(options.width - ((x + 1) * cellSize.width), options.height - ((y + 1) * cellSize.height));
      else if (angle === 270)
        ctx.translate(x * cellSize.width, options.height - ((y + 1) * cellSize.height));*/
      const value = random.float();
      const color = random.color();
      ctx.fillStyle = color;
      if (value < 0.17) {
        drawSquare(ctx, cellSize)
      } else if (value < 0.34) {
        const stripes = random.intBetween(MIN_STRIPES, MAX_STRIPES);
        const size = {
          width: cellSize.width,
          height: cellSize.height / ((stripes * 2) - 1)
        };
        const space = size.height;

        drawStripedSquare(ctx, stripes, space, size);
      } else if (value < 0.51) {
        drawTriangle(ctx, cellSize);
      } else if (value < 0.68){
        drawHalfAndHalf(ctx, cellSize);
      } else if (value < 0.85) {
        const stripes = random.intBetween(MIN_STRIPES, MAX_STRIPES);
        const size = {
          width: cellSize.width,
          height: cellSize.height / ((stripes * 2) - 1)
        };
        const space = size.height;

        drawStripedTriangle(ctx, stripes, space, size);
      } else {
        const stripes = random.intBetween(MIN_STRIPES, MAX_STRIPES);
        const size = {
          width: cellSize.width,
          height: cellSize.height / ((stripes * 2) - 1)
        };
        const space = size.height;

        drawDottedTriangle(ctx, stripes, space, size);
      }
    }
  }
}

function drawSquare(ctx, size) {
  ctx.fillRect(0, 0, size.width, size.height);
}

function drawStripedSquare(ctx, stripes, space, size) {
  for (let i = 0; i < stripes; i++)
    ctx.fillRect(0, (space + size.height) * i, size.width, size.height);
}

function drawTriangle(ctx, size) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size.width, 0);
  ctx.lineTo(size.width, size.height);
  ctx.fill();
}

function drawHalfAndHalf(ctx, size) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(size.width, 0);
  ctx.lineTo(0, size.height);
  ctx.lineTo(size.width, size.height);
  ctx.fill();
}

function drawStripedTriangle(ctx, stripes, space, size) {
  for (let i = 0; i < stripes; i++) {
    const topLeft = {x: 0, y: (i * (size.height + space))};
    const topRight = {x: topLeft.y, y: topLeft.y};
    const bottomLeft = {x: 0, y: topLeft.y + size.height};
    const bottomRight = {x: bottomLeft.y, y: bottomLeft.y};

    ctx.beginPath();
    ctx.moveTo(topLeft.x, topLeft.y);
    ctx.lineTo(topRight.x, topRight.y);
    ctx.lineTo(bottomRight.x, bottomRight.y);
    ctx.lineTo(bottomLeft.x, bottomLeft.y);
    ctx.fill();
  }
}

function drawDottedTriangle(ctx, stripes, space, size) {
  for (let i = 0; i < stripes; i++) {
    const y = i * (size.height + space);
    const width = y; // That's right-angled triangles for you
    const diameter = size.height;
    const radius = diameter / 2;

    for (let x = diameter; x < width; x += diameter * 2) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}

module.exports = generate;
