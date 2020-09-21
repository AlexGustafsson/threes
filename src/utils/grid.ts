import {CanvasRenderingContext2D} from "skia-canvas";

import {Offset, Size} from "./geometry";
import {drawRectangle} from "./canvas";
import Random from "./random";

export type CellDrawer = (ctx: CanvasRenderingContext2D) => void;

export class Cell {
  ctx: CanvasRenderingContext2D
  offset: Offset
  size: Size

  constructor(ctx: CanvasRenderingContext2D, offset: Offset, size: Size) {
    this.ctx = ctx;
    this.offset = offset;
    this.size = size;
  }

  draw(callback: CellDrawer) {
    // Create a clipping path so that nothing can be drawn outside of the cell
    this.ctx.save();
    drawRectangle(this.ctx, this.offset, this.size);
    this.ctx.clip();

    callback(this.ctx);

    // Disable the clipping path and restore the style
    this.ctx.restore();
  }

  absoluteOffset(offset: Offset): Offset {
    return {left: this.offset.left + offset.left, top: this.offset.top + offset.top};
  }
}

export class Grid {
  ctx: CanvasRenderingContext2D
  columns: number
  rows: number
  cells: Cell[]

  constructor(ctx: CanvasRenderingContext2D, columns: number, rows: number) {
    this.ctx = ctx;
    this.columns = columns;
    this.rows = rows;

    const width = ctx.canvas.width / columns;
    const height = ctx.canvas.height / rows;

    this.cells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++)
        this.cells.push(new Cell(ctx, {top: y * height, left: x * width}, {width, height}));
    }
  }
}
