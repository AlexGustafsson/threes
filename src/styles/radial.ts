import {Canvas} from "skia-canvas";

import {GeneratorCallable} from "../generator";
import Random from "../utils/random";
import {Offset} from "../utils/geometry";

const BACKGROUND = "#FFFFFF";
const SPACING_DEGREES = 3;
const SPACING = SPACING_DEGREES * Math.PI / 180;
const LINE_WIDTH = 6;

// Taken from random users' GitHub profiles
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
  "#3D7BFE"
];

export const generator: GeneratorCallable = async (ctx, random) => {
  const minRadius = ctx.canvas.width / 8;
  const maxRadius = ctx.canvas.width;

  const innerColor = random.color();
  let outerColor = random.color();
  while (outerColor == innerColor) outerColor = random.color();

  // Fill background
  const gradient = ctx.createRadialGradient(ctx.canvas.width / 2, ctx.canvas.height / 2, ctx.canvas.width / 2, ctx.canvas.width / 2, ctx.canvas.height / 2, minRadius);
  gradient.addColorStop(1, innerColor);
  gradient.addColorStop(0, outerColor);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  let colorOffset = random.intBetween(0, palette.length);

  // Draw inner circle
  ctx.fillStyle = palette[colorOffset++ % palette.length];
  ctx.beginPath();
  ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, minRadius - LINE_WIDTH, 0, 2 * Math.PI);
  ctx.fill();

  ctx.restore;
  ctx.lineWidth = LINE_WIDTH;

  for (let radius = minRadius; radius <= maxRadius; radius += LINE_WIDTH * 2) {
    const sections = Math.min(Math.max(Math.round(radius * 0.1), 3), 15);
    ctx.strokeStyle = palette[colorOffset++ % palette.length];
    const range = (2 * Math.PI) / sections;
    const offset = random.floatBetween(0, 2 * Math.PI);
    for (let i = 0; i < sections; i++) {
      const start = i * range + offset;
      const end = (i + 1) * range - SPACING + offset;
      ctx.beginPath();
      ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radius, start, end);
      ctx.stroke();
    }
  }
}
