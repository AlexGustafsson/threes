const ROWS = 4;
const COLUMNS = 4;

const MIN_RELATIVE_CELL_WIDTH = 1 / COLUMNS - 0.1;
const MAX_RELATIVE_CELL_WIDTH = 1 / COLUMNS + 0.1;

const MIN_RELATIVE_CELL_HEIGHT = 1 / ROWS - 0.1;
const MAX_RELATIVE_CELL_HEIGHT = 1 / ROWS + 0.1;

// https://www.amazon.com/Ahawoso-Mousepads-Minimalistic-Geometric-Scandinavian/dp/B07PXZ2DT8
async function generate(username, ctx, random, options) {
  const minCellWidth = MIN_RELATIVE_CELL_WIDTH * options.width;
  const maxCellWidth = MAX_RELATIVE_CELL_WIDTH * options.width;
  const minCellHeight = MIN_RELATIVE_CELL_HEIGHT * options.height;
  const maxCellHeight = MAX_RELATIVE_CELL_HEIGHT * options.height;

  const columns = [];
  let widthLeft = options.width;
  for (let column = 0; column < COLUMNS; column++) {
    let columnWidth = random.intBetween(minCellWidth, maxCellWidth);
    columnWidth = Math.min(columnWidth, widthLeft);
    widthLeft -= columnWidth;
    columns.push(columnWidth);
  }
  if (widthLeft > 0)
    columns[COLUMNS - 1] += widthLeft;

  const rows = [];
  let heightLeft = options.height;
  for (let row = 0; row < ROWS; row++) {
    let columnHeight = random.intBetween(minCellHeight, maxCellHeight);
    columnHeight = Math.min(columnHeight, heightLeft);
    heightLeft -= columnHeight;
    rows.push(columnHeight);
  }
  if (heightLeft > 0)
    rows[ROWS - 1] += heightLeft;

  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS; column++) {
      const x = columns.slice(0, column).reduce((sum, width) => sum + width, 0);
      const y = rows.slice(0, row).reduce((sum, height) => sum + height, 0);
      drawCell(ctx, random, {x, y}, {width: columns[column], height: rows[row]});
    }
  }
}

function drawCell(ctx, random, position, size) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(position.x, position.y);
  ctx.lineTo(position.x + size.width, position.y);
  ctx.lineTo(position.x + size.width, position.y + size.height);
  ctx.lineTo(position.x, position.y + size.height);
  ctx.lineTo(position.x, position.y);
  ctx.clip();

  ctx.fillStyle = random.color();
  ctx.fillRect(position.x, position.y, size.width, size.height);
  if (random.bool(0.25)) {
    drawCircleInCell(ctx, random, position, size);
  } else if (random.bool(0.25)) {
    drawTriangleInCell(ctx, random, position, size);
  } else if (random.bool(0.25)) {
    drawRectangleInCell(ctx, random, position, size);
  }

  ctx.restore();
}

function drawCircleInCell(ctx, random, position, size) {
  ctx.fillStyle = random.color();

  const x = random.element(position.x, position.x + size.width);
  const y = random.element(position.y, position.y + size.height);

  ctx.beginPath();
  ctx.arc(x, y, size.width, 0, 2 * Math.PI);
  ctx.fill();
}

function drawTriangleInCell(ctx, random, position, size) {
  ctx.fillStyle = random.color();

  if (random.bool()) {
    ctx.moveTo(position.x, position.y);
    ctx.lineTo(position.x, position.y + size.height);
    ctx.lineTo(position.x + size.width, position.y + size.height);
  } else {
    ctx.moveTo(position.x + size.width, position.y);
    ctx.lineTo(position.x + size.width, position.y + size.height);
    ctx.lineTo(position.x + size.width, position.y);
  }

  ctx.fill();
}

function drawRectangleInCell(ctx, random, position, size) {
  ctx.fillStyle = random.color();

  if (random.bool(0.25)) // Top, scaling towards bottom
    ctx.fillRect(position.x, position.y, size.width, random.intBetween(size.height * 0.2, size.height));
  else if (random.bool(0.25)) // Bottom, scaling towards top
    ctx.fillRect(position.x, position.y + size.height, size.width, -random.intBetween(size.height * 0.2, size.height));
  else if (random.bool(0.25)) // Left, scaling towards the right
    ctx.fillRect(position.x, position.y, random.intBetween(size.width * 0.2, size.width), size.height);
  else // Right, scaling towards the left
    ctx.fillRect(position.x + size.width, position.y, -random.intBetween(size.width * 0.2, size.width), size.height);
}

module.exports = generate;