const COLUMNS = 16;
const ROWS = 32;

const MIN_POINTS = 5;
const PREFFERED_MIN_POINTS = ROWS / 2;
const MAX_POINTS = ROWS;

const MAX_MOVEMENTS = 5;
const CONTINUE_LINE_PERCENTILE = 0.9;

const STROKE = false;

const STATE = Object.freeze({
  startedMove: Symbol('StartedMove'),
  moved: Symbol('Moved'),
  down: Symbol('Down')
});

// Inspired by: https://www.vectorstock.com/royalty-free-vector/logo-design-hexagon-zigzag-icon-symbol-vector-5660022
async function generate(username, ctx, random, options) {
  // Make the background white if it's a JPEG being generated (will be black otherwise)
  if (options.format === 'jpg') {
    const backgroundColor = '#FFFFFF';
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, options.width, options.height);
  }

  const spacing = {
    horizontal: options.width / (COLUMNS - 1),
    vertical: options.height / (ROWS - 1)
  };

  // Draw grid for debugging
  /*ctx.fillStyle = '#FF0000';
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLUMNS; x++) {
      ctx.beginPath();
      ctx.arc(x * spacing.horizontal, y * spacing.vertical, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  }*/

  const positions = {};

  // Generate lines
  let minPoints = PREFFERED_MIN_POINTS;
  const lines = [];
  for (let createdLines = 0, tries = 0; tries < 1000 && createdLines < 10; tries++) {
    const x = random.intBetween(0, Math.floor(COLUMNS / 2));
    const y = random.intBetween(0, Math.floor(ROWS / 2));
    const line = generateLine(x, y, random, minPoints, MAX_POINTS);
    const points = [...line.left, ...line.right];
    // Stop if the grid position has been used
    if (points.some(point => positions[`${point.x}:${point.y}`] || point.x < 0 || point.x > (COLUMNS / 2))) {
      minPoints = Math.max(MIN_POINTS, minPoints - 1);
      continue;
    }

    // Add the used points to the grid
    for (const point of points)
      positions[`${point.x}:${point.y}`] = true;

    lines.push(line);
    createdLines++;
  }

  // Draw lines
  ctx.fillStyle = random.color();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  // Draw lines on left side
  for (const line of lines)
    drawLine(ctx, line, {horizontal: spacing.horizontal, vertical: spacing.vertical});
  // Draw the right side mirrored vertically and horizontally
  for (const line of lines)
    drawLine(ctx, mirrorLine(line), {horizontal: spacing.horizontal, vertical: spacing.vertical}, true);
}

function mirrorLine(line) {
  return {
    left: line.left.map(point => ({x: COLUMNS - point.x, y: ROWS - point.y})),
    right: line.right.map(point => ({x: COLUMNS - point.x, y: ROWS - point.y}))
  }
}

function drawLine(ctx, line, spacing, mirrored = false) {
  const {left, right} = line;
  if (!mirrored)
    left.reverse();

  ctx.beginPath();
  ctx.moveTo(right[0].x * spacing.horizontal, right[0].y * spacing.vertical);
  for (let i = 1; i < right.length; i++)
    ctx.lineTo(right[i].x * spacing.horizontal, right[i].y * spacing.vertical);
  for (let i = 0; i < left.length; i++)
    ctx.lineTo(left[i].x * spacing.horizontal, left[i].y * spacing.vertical);
  ctx.lineTo(right[0].x * spacing.horizontal, right[0].y * spacing.vertical);
  ctx.fill();
  if (STROKE)
    ctx.stroke();
}

function generateLine(x, y, random, minPoints, maxPoints) {
  const line = startLine(x, y, random);
  let state = STATE.down;
  let movements = 0;
  for (let i = 0; i < random.intBetween(minPoints, maxPoints); i++) {
    if (state === STATE.down) {
      if (random.bool(CONTINUE_LINE_PERCENTILE) || movements === MAX_MOVEMENTS) {
        continueLine(line);
      } else {
        startLineMove(line, random);
        state = STATE.startedMove;
        movements++;
      }
    } else if (state === STATE.startedMove || state === STATE.moved) {
      if (random.bool()) {
        continueLineMove(line);
        state = STATE.moved;
      } else {
        endLineMove(line);
        state = STATE.down;
      }
    }
  }
  endLine(line);

  return line;
}

// Starts a line. Every odd point belongs to the left side, every even the right side
function startLine(x, y, random) {
  const line = {left: [], right: []};
  if (random.bool()) {
    line.left.push({x, y}, {x, y: y + 1});
    line.right.push({x: x + 1, y: y + 1});
  } else {
    line.left.push({x, y: y + 1});
    line.right.push({x: x + 1, y}, {x: x + 1, y: y + 1});
  }

  return line;
}

function continueLine(line) {
  const [left] = line.left.slice(-1);
  const [right] = line.right.slice(-1);
  line.left.push({x: left.x, y: left.y + 1});
  line.right.push({x: right.x, y: right.y + 1});
}

function startLineMove(line, random) {
  const [left] = line.left.slice(-1);
  const [right] = line.right.slice(-1);
  if (random.bool()) {
    // Move line one step to the left
    line.left.push({x: left.x - 1, y: left.y + 1});
    line.right.push({x: right.x, y: right.y + 1}, {x: right.x - 1, y: right.y + 2});
  } else {
    // Move line one step to the right
    line.left.push({x: left.x, y: left.y + 1}, {x: left.x + 1, y: left.y + 2});
    line.right.push({x: right.x + 1, y: right.y + 1});
  }
}

function continueLineMove(line) {
  const [left] = line.left.slice(-1);
  const [right] = line.right.slice(-1);
  if (left.y > right.y) {
    // Continue right
    line.left.push({x: left.x + 1, y: left.y + 1});
    line.right.push({x: right.x + 1, y: right.y + 1});
  } else {
    // Continue left
    line.left.push({x: left.x - 1, y: left.y + 1});
    line.right.push({x: right.x - 1, y: right.y + 1});
  }
}

function endLineMove(line) {
  const [left] = line.left.slice(-1);
  const [right] = line.right.slice(-1);

  if (left.y > right.y)
    line.right.push({x: right.x, y: right.y + 1});
  else
    line.left.push({x: left.x, y: left.y + 1});
}

function endLine(line) {
  const startLeft = line.left[0];
  const startRight = line.right[0];
  const [left] = line.left.slice(-1);
  const [right] = line.right.slice(-1);
  if (left.y === right.y) {
    if (startLeft.y > startRight.y) {
      line.left.push({x: left.x, y: left.y + 1});
      line.right.push({x: right.x, y: right.y});
    } else {
      line.left.push({x: left.x, y: left.y});
      line.right.push({x: right.x, y: right.y + 1});
    }
  }
}

module.exports = generate;
