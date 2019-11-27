const {
  calculateHSP
} = require('./common/utils');

// Inspired by: https://dribbble.com/shots/1000766-A-tribute-to-Julio-Le-Parc
function generate(username, ctx, random, options) {
  const backgroundColor = random.color();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, options.width, options.height);

  const levels = random.intBetween(3, 10);
  const origin = {
    x: random.intBetween(options.width * 0.15, options.width * 0.85),
    y: random.intBetween(options.height * 0.15, options.height * 0.85),
  };
  const radius = Math.max(options.width, options.height);

  drawCircles(ctx, random, origin, levels, radius, backgroundColor);
}

function drawCircles(ctx, random, origin, levels, radius, background) {
  let previousRadius = null;
  for (let i = 0; i < levels; i++) {
    if (radius < 10)
      return;

    let foreground = random.color();
    while (foreground === background)
      foreground = random.color();

    if (previousRadius !== null) {
      ctx.save();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.arc(origin.x, origin.y, previousRadius, 0, 2 * Math.PI);
      ctx.clip();

      ctx.fillRect(origin.x, origin.y - radius, previousRadius, radius * 2);
      ctx.restore();
    }

    ctx.fillStyle = foreground;
    ctx.beginPath();
    ctx.arc(origin.x, origin.y, radius, 0, 2 * Math.PI);
    ctx.fill();

    previousRadius = radius;
    background = foreground;
    radius -= random.intBetween(25, 100);
  }
}

module.exports = generate;
