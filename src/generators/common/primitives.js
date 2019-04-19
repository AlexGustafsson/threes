function drawFullSquare(ctx, random, {left, top, width, height}) {
  const color = random.color();

  ctx.fillStyle = color;
  ctx.fillRect(left, top, width, height);
}

function drawComplementarySquare(ctx, random, {left, top, width, height}) {
  const color1 = random.color();
  const color2 = random.color();

  ctx.fillStyle = color1;
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left, top + height);
  ctx.lineTo(left + width, top + height);
  ctx.fill();

  ctx.fillStyle = color2;
  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left + width, top);
  ctx.lineTo(left + width, top + height);
  ctx.fill();
}

function drawStripedTriangle(ctx, random, {left, top, height}) {
  const color = random.color();

  const stripeHeight = 5;
  const stripeSpace = stripeHeight;
  let stripes = 0;
  for (; (stripes * stripeHeight) + ((stripes - 1) * stripeSpace) < height; stripes++);

  for (let i = 0; i < stripes; i++) {
    const topLeft = {x: 0, y: (i * (stripeHeight + stripeSpace))};
    const topRight = {x: topLeft.y, y: topLeft.y};
    const bottomLeft = {x: 0, y: topLeft.y + stripeHeight};
    const bottomRight = {x: bottomLeft.y, y: bottomLeft.y};

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(topLeft.x + left, topLeft.y + top);
    ctx.lineTo(topRight.x + left, topRight.y + top);
    ctx.lineTo(bottomRight.x + left, bottomRight.y + top);
    ctx.lineTo(bottomLeft.x + left, bottomLeft.y + top);
    ctx.fill();
  }
}

module.exports = {
  drawFullSquare,
  drawComplementarySquare,
  drawStripedTriangle
};
