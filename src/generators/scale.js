// Inspired by: https://dribbble.com/shots/5838539-Bright-Fish-Scale-Pattern
function generate(username, ctx, random, options) {
  const backgroundColor = '#F8F9EC';
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, options.width, options.height);

  const radius = 50;
  const verticalOffset = radius;


  const rows = Math.ceil((options.height + 2 * radius) / (2 * radius - verticalOffset)) + 1;
  const columns = Math.ceil((options.width + 2 * radius) / (2 * radius));

  let offset = true;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const y = options.height + (2 * radius) - (i * (2 * radius - verticalOffset));
      const x = offset ? -radius + (j * 2 * radius) : (j * 2 * radius);
      drawCircle(ctx, random, x, y, radius);
    }

    offset = !offset;
  }
}

function drawCircle(ctx, random, x, y, radius) {
  ctx.fillStyle = random.color();
  ctx.strokeStyle = '#F8F9EC';
  ctx.lineWidth = Math.round(0.05 * radius);

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}

module.exports = generate;
