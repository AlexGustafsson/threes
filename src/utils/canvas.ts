import {CanvasRenderingContext2D} from "skia-canvas";

import {Offset, Size} from "./geometry";

import {Cell} from "./grid";

/** Rotate a canvas around its center. */
export function rotateAroundCenter(ctx: CanvasRenderingContext2D, degrees: number) {
  ctx.resetTransform();
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.rotate(degrees * Math.PI / 180);
  ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
}

/** Creates a rectangle outline within a cell. */
export function drawRectangle(cell: Cell, offset: Offset, size: Size): void;
/** Creates a rectangle outline. */
export function drawRectangle(ctx: CanvasRenderingContext2D, offset: Offset, size: Size): void;
/** Creates a rectangle outline. */
export function drawRectangle(arg: Cell | CanvasRenderingContext2D, offset: Offset, size: Size): void {
  let left = offset.left;
  let top = offset.top;
  if (arg instanceof Cell) {
    left += arg.offset.left;
    top += arg.offset.top;
  }

  const ctx = arg instanceof Cell ? arg.ctx : arg;

  ctx.beginPath();
  ctx.moveTo(left, top);
  ctx.lineTo(left + size.width, top);
  ctx.lineTo(left + size.width, top + size.height);
  ctx.lineTo(left, top + size.height);
  ctx.lineTo(left, top);
}

/** Creates a circle outline within a cell. */
export function drawCircle(cell: Cell, offset: Offset, size: Size): void;
/** Creates a circle outline. */
export function drawCircle(ctx: CanvasRenderingContext2D, offset: Offset, size: Size): void;
/** Creates a circle outline. */
export function drawCircle(arg: Cell | CanvasRenderingContext2D, offset: Offset, size: Size): void {
  let left = offset.left;
  let top = offset.top;
  if (arg instanceof Cell) {
    left += arg.offset.left;
    top += arg.offset.top;
  }

  const ctx = arg instanceof Cell ? arg.ctx : arg;

  ctx.beginPath();
  ctx.arc(left, top, Math.sqrt(Math.pow(size.width, 2) + Math.pow(size.height, 2)), 0, 2 * Math.PI);
}

/** Creates a triangle outline within a cell. */
export function drawTriangle(cell: Cell, offset: Offset, size: Size): void;
/** Creates a triangle outline. */
export function drawTriangle(ctx: CanvasRenderingContext2D, offset: Offset, size: Size): void;
/** Creates a triangle outline. */
export function drawTriangle(arg: Cell | CanvasRenderingContext2D, offset: Offset, size: Size): void {
  let left = offset.left;
  let top = offset.top;
  if (arg instanceof Cell) {
    left += arg.offset.left;
    top += arg.offset.top;
  }
}

/** Creates a hexagon outline within a cell. */
export function drawHexagon(cell: Cell, offset: Offset, size: Size): void;
/** Creates a hexagon outline. */
export function drawHexagon(ctx: CanvasRenderingContext2D, offset: Offset, size: Size): void;
/** Creates a hexagon outline. */
export function drawHexagon(arg: Cell | CanvasRenderingContext2D, offset: Offset, size: Size): void {
  let left = offset.left;
  let top = offset.top;
  if (arg instanceof Cell) {
    left += arg.offset.left;
    top += arg.offset.top;
  }
  const radius = size.width / 2;

  const ctx = arg instanceof Cell ? arg.ctx : arg;

  ctx.beginPath();
  ctx.moveTo(left + (radius / 2), top); // Top left corner
  ctx.lineTo(left + size.width - (radius / 2), top); // Top right corner
  ctx.lineTo(left + size.width, top + size.height / 2); // Middle of right side
  ctx.lineTo(left + size.width - (radius / 2), top + size.height); // Bottom right corner
  ctx.lineTo(left + (radius / 2), top + size.height); // Bottom left corner
  ctx.lineTo(left, top + size.height / 2); // Middle of left side
}
