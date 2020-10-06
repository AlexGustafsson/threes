import {Canvas} from "skia-canvas";

import {GeneratorCallable} from "../generator";
import Random from "../utils/random";
import {Polygon, Offset} from "../utils/geometry";
import {rotateAroundCenter} from "../utils/canvas";

// Jagged lines
const PATTERN_HEIGHT = 25 / 320;
const PATTERN_WIDTH = 25 / 320;
const MIN_STROKE_WIDTH = 8 / 320;
const MAX_STROKE_WIDTH = 12 / 320;
const BACKGROUND_COLOR = "#000000";

// Shutter lines
const STROKE_COLOR = "#000000";
const STROKE_WIDTH = MAX_STROKE_WIDTH;

// Taken from: https://dribbble.com/shots/5838539-Bright-Fish-Scale-Pattern
export const palette = [
  '#00A29B',
  '#F68498',
  '#F2BC4B',
  '#282149',
  '#FFB3C3',
  '#E76234',
  '#F58397',
  '#F8F9EC'
];

export const generator: GeneratorCallable = async (ctx, random) => {
  const maxSide = Math.max(ctx.canvas.width, ctx.canvas.height);
  const hypotenuse = Math.sqrt(Math.pow(maxSide, 2) + Math.pow(maxSide, 2))
  const scale = hypotenuse / maxSide;
  const canvas = drawContent(ctx.canvas.width * scale, ctx.canvas.height * scale, random);

  ctx.imageSmoothingEnabled = true;

  // Polygons to control the "shutters" of the picture
  const top = new Polygon(...[
    {left: 0, top: 0},
    {left: ctx.canvas.width, top: 0},
    {left: ctx.canvas.width, top: random.intBetween(ctx.canvas.height * 0.3, ctx.canvas.height * 0.4)},
    {left: 0, top: random.intBetween(ctx.canvas.height * 0.05, ctx.canvas.height * 0.15)}
  ] as Offset[]);

  const right = new Polygon(...[
    {left: random.intBetween(ctx.canvas.width * 0.45, ctx.canvas.width * 0.6), top: 0},
    {left: ctx.canvas.width, top: 0},
    {left: ctx.canvas.width, top: ctx.canvas.height},
    {left: random.intBetween(ctx.canvas.width * 0.85, ctx.canvas.width * 0.95), top: ctx.canvas.height}
  ] as Offset[]);

  const bottom = new Polygon(...[
    {left: 0, top: random.intBetween(ctx.canvas.height * 0.6, ctx.canvas.height * 0.8)},
    {left: ctx.canvas.width, top: random.intBetween(ctx.canvas.height * 0.85, ctx.canvas.height * 0.95)},
    {left: ctx.canvas.width, top: ctx.canvas.height},
    {left: 0, top: ctx.canvas.height}
  ] as Offset[]);

  const left = new Polygon(...[
    {left: 0, top: 0},
    {left: random.intBetween(ctx.canvas.width * 0.4, ctx.canvas.width * 0.6), top: 0},
    {left: random.intBetween(ctx.canvas.width * 0.05, ctx.canvas.width * 0.15), top: ctx.canvas.height},
    {left: 0, top: ctx.canvas.height}
  ] as Offset[]);

  // Each shutter has a polygon and two indices - the points used to stroke the edge facing towards the middle
  const shutters: [Polygon, number, number][] = [[bottom, 0, 1], [left, 1, 2], [top, 2, 3], [right, 0, 3]];

  // Draw the image once to serve as a background
  ctx.drawImage((canvas as unknown) as CanvasImageSource, 0, 0, canvas.width, canvas.height);

  if (ctx.canvas.width < 100 || ctx.canvas.height < 100)
    return;

  ctx.lineWidth = STROKE_WIDTH * canvas.width;
  ctx.lineCap = "round";
  ctx.strokeStyle = STROKE_COLOR;

  for (let [shutter, a, b] of shutters) {
    ctx.save();
    // Clip to the polygon (shutter)
    ctx.beginPath();
    shutter.draw(ctx);
    ctx.clip();

    // Draw the image in the center, randomly rotating to a maximum of 45 degrees
    ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
    ctx.rotate(random.floatBetween(0, 1));
    ctx.drawImage((canvas as unknown) as CanvasImageSource, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    ctx.restore();

    // Stroke the specified edge of the polygon (the one facing inwards)
    ctx.beginPath();
    ctx.moveTo(shutter.points[a].left, shutter.points[a].top);
    ctx.lineTo(shutter.points[b].left, shutter.points[b].top);
    ctx.stroke();
  }
}

function drawContent(width: number, height: number, random: Random): Canvas {
  // Create a canvas with content which can easily be scaled
  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext("2d");

  // Fill background
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw the jagged lines across the canvas
  ctx.lineCap = "round";
  for (let y = 0; y < ctx.canvas.height + Math.round(PATTERN_HEIGHT * ctx.canvas.height); y += Math.round(PATTERN_HEIGHT * ctx.canvas.height)) {
    ctx.moveTo(0, y);
    ctx.beginPath();
    for (let x = 0; x < ctx.canvas.width + Math.round(PATTERN_WIDTH * ctx.canvas.width); x += Math.round(PATTERN_WIDTH * ctx.canvas.width)) {
      // Alternate the height every other step on the x-axis
      ctx.lineTo(x, (x / Math.round(PATTERN_WIDTH * ctx.canvas.width)) % 2 === 0 ? y: y - Math.round(PATTERN_HEIGHT * ctx.canvas.height));
    }
    ctx.strokeStyle = random.color();
    ctx.lineWidth = random.intBetween(MIN_STROKE_WIDTH * ctx.canvas.height, MAX_STROKE_WIDTH * ctx.canvas.width);
    ctx.stroke();
  }

  return canvas;
}
