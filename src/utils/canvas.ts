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
