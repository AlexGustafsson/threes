const RELATIVE_MARGIN = 0.09;
const COLUMNS = 5;
const ROWS = 5;
const MIN_DRAW_CHANCE = 0.4;
const MAX_DRAW_CHANCE = 0.75;

function generate(username, ctx, random, options) {
  const margin = {
    horizontal: Math.round(RELATIVE_MARGIN * options.width),
    vertical: Math.round(RELATIVE_MARGIN * options.height)
  };

  const cellSize = {
    width: Math.round((options.width - (2 * margin.horizontal)) / COLUMNS),
    height: Math.round((options.height - (2 * margin.vertical)) / COLUMNS)
  };

  const backgroundColor = '#F0F0F0';
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, options.width, options.height);

  const foregroundColor = random.color();
  const drawChance = random.float();
  ctx.fillStyle = foregroundColor;
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < Math.ceil(COLUMNS / 2); x++) {
      if (random.float() > Math.max(Math.min(MAX_DRAW_CHANCE, drawChance), MIN_DRAW_CHANCE))
        continue;

      const position = {
        x: margin.horizontal + (x * cellSize.width),
        y: margin.vertical + (y * cellSize.height)
      };

      const mirroredPosition = {
        x: options.width - (2 * margin.horizontal) - position.x,
        y: position.y
      };

      ctx.fillRect(position.x, position.y, cellSize.width, cellSize.height);

      if (x < Math.floor(COLUMNS / 2))
        ctx.fillRect(mirroredPosition.x, mirroredPosition.y, cellSize.width, cellSize.height);
    }
  }
}

module.exports = generate;
