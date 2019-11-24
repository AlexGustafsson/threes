// Inspired by: https://dribbble.com/shots/6679208--Charm-Pattern
function generate(username, ctx, random, options) {
  const backgroundColor = '#FBF3D7';
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, options.width, options.height);

  const radius = 50;
  const width = 2 * radius;
  const height = radius * 2;
  const horizontalSpacing = radius * Math.sqrt(2.23);
  const verticalSpacing = height;

  const columns = 7;
  const rows = 7;

  let offset = false;
  let x = -horizontalSpacing;
  let y = -verticalSpacing;
  for (let column = 0; column < columns; column++) {
    y = offset ? -verticalSpacing / 2 : -verticalSpacing;
    for (let row = 0; row < rows; row++) {
      drawHexagon(ctx, random, x, y, radius);
      y += verticalSpacing;
    }
    x += horizontalSpacing;
    offset = !offset;
  }
}

function drawHexagon(ctx, random, x, y, radius) {
  ctx.fillStyle = random.color();

  // Middle of left side
  ctx.beginPath();
  ctx.moveTo(x - radius, y);
  // Top left corner
  ctx.lineTo(x - (radius / 2), y - radius);
  // Top right corner
  ctx.lineTo(x + (radius / 2), y - radius);
  // Middle of right side
  ctx.lineTo(x + radius, y);
  // Bottom right corner
  ctx.lineTo(x + (radius / 2), y + radius);
  // Bottom left corner
  ctx.lineTo(x - (radius / 2), y + radius);
  // Middle of left side
  ctx.moveTo(x - radius, y);
  ctx.fill();

  if (random.bool()) {
    if (random.bool()) {
      // Chance to draw top right side
      if (random.bool(0.9)) {
        ctx.fillStyle = random.color();
        // Middle of right side
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        // Top right corner
        ctx.lineTo(x + (radius / 2), y - radius);
        // Top left corner
        ctx.lineTo(x - (radius / 2), y - radius);
        // Rounded bottom to middle of right side
        ctx.bezierCurveTo(x, y, x, y, x + radius, y);
        ctx.fill();
      }

      if (random.bool(0.9)) {
        // Change to draw bottom left side
        ctx.fillStyle = random.color();
        // Middle of left side
        ctx.beginPath();
        ctx.moveTo(x - radius, y);
        // Bottom left corner
        ctx.lineTo(x - (radius / 2), y + radius);
        // Bottom right corner
        ctx.lineTo(x + (radius / 2), y + radius);
        // Rounded bottom to middle of left side
        ctx.bezierCurveTo(x, y, x, y, x - radius, y);
        ctx.fill();
      }
    }
  } else {
    // Chance to draw top left circle
    if (random.bool(0.9)) {
      ctx.fillStyle = random.color();
      // Middle of left side
      ctx.beginPath();
      ctx.moveTo(x - radius, y);
      // Top left corner
      ctx.lineTo(x - (radius / 2), y - radius);
      // Top right corner
      ctx.lineTo(x + (radius / 2), y - radius);
      // Rounded bottom to middle of left side
      ctx.bezierCurveTo(x, y, x, y, x - radius, y);
      ctx.fill();
    }

    // Chance to draw bottom right circle
    if (random.bool(0.9)) {
      ctx.fillStyle = random.color();
      // Middle of left side
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      // Bottom right corner
      ctx.lineTo(x + (radius / 2), y + radius);
      // Bottom left corner
      ctx.lineTo(x - (radius / 2), y + radius);
      // Rounded bottom to middle of right side
      ctx.bezierCurveTo(x, y, x, y, x + radius, y);
      ctx.fill();
    }
  }
}

module.exports = generate;
