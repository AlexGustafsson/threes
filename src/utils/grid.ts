import {CanvasRenderingContext2D} from "skia-canvas";

import {Offset, Size, Shape, Rectangle, Hexagon} from "./geometry";

export type CellDrawer = (ctx: CanvasRenderingContext2D) => void;

export class Cell {
  ctx: CanvasRenderingContext2D
  shape: Shape

  constructor(ctx: CanvasRenderingContext2D, shape: Shape) {
    this.ctx = ctx;
    this.shape = shape;
  }

  draw(callback: CellDrawer): void {
    // Create a clipping path so that nothing can be drawn outside of the cell
    this.ctx.save();
    this.ctx.beginPath();
    this.shape.draw(this.ctx);
    this.ctx.clip();

    callback(this.ctx);

    // Disable the clipping path and restore the style
    this.ctx.restore();
  }

  fill(color: string): void {
    this.ctx.save();
    this.ctx.beginPath();
    this.shape.draw(this.ctx);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.restore();
  }

  absoluteOffset(offset: Offset): Offset {
    return {left: this.shape.offset.left + offset.left, top: this.shape.offset.top + offset.top};
  }
}

export abstract class Grid {
  ctx: CanvasRenderingContext2D
  columns: number
  rows: number
  cells: Cell[]

  constructor(ctx: CanvasRenderingContext2D, columns: number, rows: number, cells: Cell[]) {
    this.ctx = ctx;
    this.columns = columns;
    this.rows = rows;
    this.cells = cells;
  }
}

export class SquareGrid extends Grid {
  constructor(ctx: CanvasRenderingContext2D, columns: number, rows: number) {
    const width = ctx.canvas.width / columns;
    const height = ctx.canvas.height / rows;

    const cells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++)
        cells.push(new Cell(ctx, new Rectangle({top: y * height, left: x * width}, {width, height})));
    }

    super(ctx, columns, rows, cells);
  }

  getCell(column: number, row: number): Cell {
    return this.cells[row * this.columns + column];
  }
}

export class HexGrid extends Grid {
  constructor(ctx: CanvasRenderingContext2D, columns: number, rows: number, radius: number) {
    const height = Math.sqrt(3) * radius;

    const cells = [];

    const horizontalSpacing = 3 * radius / 2;
    const verticalSpacing = height;

    let offset = false;
    let left = -horizontalSpacing;
    let top = -verticalSpacing;
    for (let column = 0; column < columns; column++) {
      top = offset ? -verticalSpacing / 2 : -verticalSpacing;
      for (let row = 0; row < rows; row++) {
        cells.push(new Cell(ctx, new Hexagon({top, left}, radius)));
        top += verticalSpacing;
      }
      left += horizontalSpacing;
      offset = !offset;
    }

    super(ctx, columns, rows, cells);
  }
}
