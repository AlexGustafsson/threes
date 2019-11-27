function rotateAroundCenter(ctx, degrees) {
  ctx.resetTransform();
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.rotate(degrees * Math.PI / 180);
  ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
}

// Calculate brightness using http://alienryderflex.com/hsp.html
function calculateHSP(color) {
  // Extract RGB from hex code
  const [_, r, g, b] = color.match(/#(..)(..)(..)/).map(x => parseInt(x, 16));
  const hsp = Math.sqrt((0.299 * r * r) + (0.587 * g * g) + (0.114 * b * b));

  return hsp;
}

module.exports = {
  rotateAroundCenter,
  calculateHSP
};
