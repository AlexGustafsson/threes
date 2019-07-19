const {
  utils: {
    rotateAroundCenter
  }
} = require('./common');

const MIN_PERIODS = 0;
const MAX_PERIODS = 3;

const MIN_RELATIVE_AMPLITUDE = 0.10;
const MAX_RELATIVE_AMPLITUDE = 0.05;

const MIN_ROTATION = -0.3;
const MAX_ROTATION = 0.3;

const NOISE_SCALE = 2;

// https://bpando.org/2018/04/19/branding-helsinki/
async function generate(username, ctx, random, options) {
  const periods = random.intBetween(MIN_PERIODS, MAX_PERIODS);
  const amplitude = random.intBetween(MIN_RELATIVE_AMPLITUDE * options.height, MAX_RELATIVE_AMPLITUDE * options.height);
  const rotation = random.floatBetween(MIN_ROTATION, MAX_ROTATION);

  if (random.bool()) {
    rotateAroundCenter(ctx, 90);
  }

  const phase = (2 * Math.PI) / (options.width / periods);
  const wave = new Array(options.width).fill(0).map((_, x) => amplitude * Math.cos(phase * x) - rotation * x);

  const primary = random.color();
  let secondary = random.color();
  while (secondary === primary)
    secondary = random.color();

  ctx.fillStyle = primary;
  ctx.fillRect(0, 0, options.width, options.height);

  ctx.fillStyle = secondary;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let x = 0; x < wave.length; x++) {
    ctx.lineTo(x, options.height / 2 + wave[x]);
  }
  ctx.lineTo(options.width, 0);
  ctx.fill();

  for (let y = 0; y < options.height; y += NOISE_SCALE) {
    for (let x = 0; x < options.width; x += NOISE_SCALE) {
      const gray = random.intBetween(50, 255);
      const opacity = random.floatBetween(0, 0.05);
      ctx.fillStyle = `rgba(${gray}, ${gray}, ${gray}, ${opacity})`;
      ctx.fillRect(x, y, NOISE_SCALE, NOISE_SCALE);
    }
  }
}

module.exports = generate;
