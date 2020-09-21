import {Canvas} from "skia-canvas";

import {GeneratorCallable} from "../generator";
import {rotateAroundCenter} from "../utils/canvas";
import Random from "../utils/random";

const MIN_PERIODS = 0;
const MAX_PERIODS = 3;

const MIN_RELATIVE_AMPLITUDE = 0.10;
const MAX_RELATIVE_AMPLITUDE = 0.05;

const MIN_ROTATION = -0.3;
const MAX_ROTATION = 0.3;

const GAP = 5;

// Generate a random noise texture
const noiseTexture: ImageData = (() => {
  const random = new Random("helsinki");
  const canvas = new Canvas(32, 32);
  const ctx = canvas.getContext("2d");
  const data = ctx.createImageData(32, 32);
  const buffer = new Uint32Array(data.data.buffer);
  for (let i = 0; i < buffer.length; i++) {
    const gray = random.intBetween(0, 255);
    buffer[i] = gray | (gray << 8) | (gray << 16) | (255 << 24);
  }
  return data;
})();

// Taken from https://bpando.org/2018/04/19/branding-helsinki/
export const palette = [
  "#50BD9D",
  "#F37022",
  "#2F3296",
  "#C89A4E",
  "#F6A4CA",
  "#E73126",
  "#0374BD",
  "#9FCAEC"
];

// Inspired by https://bpando.org/2018/04/19/branding-helsinki/
export const generator: GeneratorCallable = async (ctx, random, options) => {
  const periods = random.intBetween(MIN_PERIODS, MAX_PERIODS);
  const amplitude = random.intBetween(MIN_RELATIVE_AMPLITUDE * ctx.canvas.height, MAX_RELATIVE_AMPLITUDE * ctx.canvas.height);
  const rotation = random.floatBetween(MIN_ROTATION, MAX_ROTATION);

  // Either show the curve on the horizontal or vertical axis
  if (random.bool())
    rotateAroundCenter(ctx, 90);

  const phase = (2 * Math.PI) / (ctx.canvas.width / periods);
  const wave = (x: number) => amplitude * Math.cos(phase * x) - rotation * x;

  const primary = random.color();
  let secondary = random.color();
  while (secondary === primary)
    secondary = random.color();

  // Fill the entire image
  ctx.fillStyle = primary;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw the wave using line segments
  ctx.fillStyle = secondary;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  for (let x = 0; x < ctx.canvas.width + GAP; x += GAP)
    ctx.lineTo(x, ctx.canvas.height / 2 + wave(x));
  ctx.lineTo(ctx.canvas.width, 0);
  ctx.fill();

  // Disabled for now, see: https://github.com/samizdatco/skia-canvas/issues/6
  // if (options.format !== "svg") {
  //   const canvas = new Canvas(32, 32);
  //   const noise = canvas.getContext("2d");
  //   noise.putImageData(noiseTexture, 0, 0);
  //   ctx.globalAlpha = 0.5;
  //   ctx.drawImage((canvas as unknown) as CanvasImageSource, 0, 0, ctx.canvas.width, ctx.canvas.height);
  //   ctx.globalAlpha = 1.0;
  // }
};
