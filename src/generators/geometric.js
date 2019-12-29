const WIDTH = 50;
const HEIGHT = 50;
const NOISE_SCALE = 2;

// Inspired by: https://pixers.se/tapeter/abstract-geometric-pattern-100262716
function generate(username, ctx, random, options) {
  const backgroundColor = random.color();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, options.width, options.height);

  const rows = Math.ceil(options.height / HEIGHT);
  const columns = Math.ceil((options.width + WIDTH) / (WIDTH / 2));
  const foregrounds = Array(4).fill(null).map(x => random.color());

  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const x = column * (WIDTH / 2) - WIDTH / 2;
      const y = row * HEIGHT;
      let index = row % 2 === 0 ? column * 2 + row * 2 : column * 1 - row * 1;
      let modIndex = index % foregrounds.length;
      if (modIndex < 0)
        modIndex = foregrounds.length + modIndex;
      const foreground = foregrounds[modIndex];

      if ((column + row) % 2 === 0)
        drawInvertedTriangle(ctx, x, y, foreground);
      else
        drawTriangle(ctx, x, y, foreground);
    }
  }

  if (options.format !== 'svg') {
    for (let y = 0; y < options.height; y += NOISE_SCALE) {
      for (let x = 0; x < options.width; x += NOISE_SCALE) {
        const gray = random.intBetween(50, 255);
        const opacity = random.floatBetween(0, 0.05);
        ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${opacity})`;
        ctx.fillRect(x, y, NOISE_SCALE, NOISE_SCALE);
      }
    }
  }
}

function drawTriangle(ctx, x, y, foreground) {
  ctx.fillStyle = foreground;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + WIDTH, y);
  ctx.lineTo(x + (WIDTH / 2), y + HEIGHT);
  ctx.lineTo(x, y);
  ctx.fill();
}

function drawInvertedTriangle(ctx, x, y, foreground) {
  ctx.fillStyle = foreground;
  ctx.beginPath();
  ctx.moveTo(x, y + HEIGHT);
  ctx.lineTo(x + (WIDTH / 2), y);
  ctx.lineTo(x + WIDTH, y + HEIGHT);
  ctx.lineTo(x, y + HEIGHT);
  ctx.fill();
}

module.exports = generate;
