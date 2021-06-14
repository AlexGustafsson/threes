import {Canvas} from "skia-canvas";

import {GeneratorCallable} from "../generator";
import Random from "../utils/random";
import {Curve} from "../utils/geometry";

const FREQUENCY_SCALE = 1e3 / 320;
const MIN_FREQUENCY_OFFSET = 0.5;
const MAX_FREQUENCY_OFFSET = 2;
const CURVE_SCALE = 20 / 320;
const COLUMNS = 5;
const GAP = 2 / 320;
const SHADOW_COLOR = "rgba(0, 0, 0, 0.4)";

// Based off of https://dribbble.com/shots/5367995-Grabient-Landing-Page
export const palette = [
  "#FE456C",
  "#FE7D2D",
  "#FE0EF4",
  "#FD008A",
  "#FE126C",
  "#A4049F",
  "#BD01A6",
  "#8116E2",
  "#8000FE",
  "#5665F2",
  "#24D3FE",
  "#3D7BFE",
  "#97FEA4",
  "#75F2B5"
];

// Based off of https://dribbble.com/shots/5367995-Grabient-Landing-Page
export const generator: GeneratorCallable = async (ctx, random) => {
  const hypotenuse = Math.round(Math.sqrt(Math.pow(ctx.canvas.width, 2) + Math.pow(ctx.canvas.height, 2)));
  // Rotate the canvas around its center
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.rotate(random.intBetween(0, 90) * 180 / Math.PI);
  ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);

  // Create the content and draw it
  ctx.imageSmoothingEnabled = true;
  const canvas = drawContent(hypotenuse, random);
  ctx.drawImage((canvas as unknown) as CanvasImageSource, (ctx.canvas.width - hypotenuse) / 2, (ctx.canvas.height - hypotenuse) / 2, hypotenuse, hypotenuse);
};

function drawContent(hypotenuse: number, random: Random): Canvas {
  // Create a canvas with content which can easily be scaled
  const canvas = new Canvas(hypotenuse, hypotenuse);
  const ctx = canvas.getContext("2d");

  const columnHeight = hypotenuse / COLUMNS;
  const offsets: number[] = [];

  ctx.shadowColor = SHADOW_COLOR;
  ctx.shadowBlur = columnHeight / 3;
  // Draw each column
  for (let column = 0; column < COLUMNS; column++) {
    // Get a color combo not used before
    let paletteOffset = random.intBetween(0, 6) * 2;
    while(offsets.includes(paletteOffset)) paletteOffset = random.intBetween(0, 6) * 2;
    offsets.push(paletteOffset);

    // Create a gradient
    const gradient = ctx.createLinearGradient(0, 0, random.intBetween(ctx.canvas.width * 0.2, ctx.canvas.width), random.intBetween(ctx.canvas.height * 0.2, ctx.canvas.height));
    gradient.addColorStop(0, palette[paletteOffset]);
    gradient.addColorStop(1, palette[paletteOffset + 1]);
    ctx.fillStyle = gradient;

    // Create a random curve for the user
    const frequencyOffset = random.floatBetween(MIN_FREQUENCY_OFFSET / (FREQUENCY_SCALE * hypotenuse), MAX_FREQUENCY_OFFSET / (FREQUENCY_SCALE * hypotenuse));
    const periodOffset = random.intBetween(0, 360);
    const curve = new Curve(Math.max(1, GAP * hypotenuse), -10, ctx.canvas.width + 10, x => CURVE_SCALE * hypotenuse * Math.sin((x + periodOffset) * frequencyOffset * 180 / Math.PI));

    // Draw the curves in reverse order so that each gradient covers the before
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.translate(0, (COLUMNS - column) * columnHeight);
    curve.draw(ctx);
    ctx.translate(0, -(COLUMNS - column) * columnHeight);
    ctx.lineTo(ctx.canvas.width + 10, 0);
    ctx.fill();
  }

  return canvas;
}
