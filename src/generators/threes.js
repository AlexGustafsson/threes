const {
  primitives: {
    drawFullSquare,
    drawComplementarySquare,
    drawStripedTriangle
  }
} = require('./common');

// https://freefrontend.com/css-background-patterns/
async function generate(username, ctx, random, options) {
  const wantedWidth = Math.floor(1 / 6 * options.width);
  const wantedHeight = Math.floor(1 / 6 * options.height);

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
}

module.exports = generate;
