function rotateAroundCenter(ctx, degrees) {
  ctx.resetTransform();
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.rotate(degrees * Math.PI / 180);
  ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
}

module.exports = {
  rotateAroundCenter
};
