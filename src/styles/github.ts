import {Canvas} from "skia-canvas";

import {GeneratorCallable} from "../generator";
import Random from "../utils/random";
import {Offset} from "../utils/geometry";
import {SquareGrid} from "../utils/grid";
import {Circle, Polygon, Shape} from "../utils/geometry";

const COLUMNS = 5;
const ROWS = 5;
const BACKGROUND = '#F0F0F0';

// Taken from random users' GitHub profiles
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
  // Fill background
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // The margin correlates to 20px on a canvas of 320px
  const margin = Math.round(Math.min(ctx.canvas.width, ctx.canvas.height) * 0.0625);

  const canvas = drawContent(ctx.canvas.width, ctx.canvas.height, random);
  ctx.imageSmoothingEnabled = true;
  ctx.drawImage((canvas as unknown) as CanvasImageSource, margin, margin, ctx.canvas.width - margin * 2, ctx.canvas.height - margin * 2);
}

function drawContent(width: number, height: number, random: Random): Canvas {
  // Create a canvas with content which can easily be scaled
  const canvas = new Canvas(width, height);
  const ctx = canvas.getContext("2d");
  const foreground = random.color();

  // Fill background
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Draw grid
  const grid = new SquareGrid(ctx, COLUMNS, ROWS);
  for (let row = 0; row < ROWS; row++) {
    for (let column = 0; column < COLUMNS / 2; column++) {
      if (random.bool(0.75)) {
        const cell = grid.getCell(column, row);
        cell.fill(foreground);

        const mirroredCell = grid.getCell(COLUMNS - column - 1, row);
        if (mirroredCell)
          mirroredCell.fill(foreground);
      }
    }
  }

  return canvas;
}
