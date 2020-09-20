import {CanvasRenderingContext2D} from "skia-canvas";

export function rotateAroundCenter(ctx: CanvasRenderingContext2D, degrees: number) {
  ctx.resetTransform();
  ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
  ctx.rotate(degrees * Math.PI / 180);
  ctx.translate(-ctx.canvas.width / 2, -ctx.canvas.height / 2);
}

// Calculate brightness using http://alienryderflex.com/hsp.html
export function calculateHSP(color: string) {
  // Extract RGB from hex code
  const matches = color.match(/#(..)(..)(..)/);
  if (!matches)
    throw new Error("Got bad hex color");
  const [_, r, g, b] = matches.map(x => parseInt(x, 16));
  const hsp = Math.sqrt((0.299 * r * r) + (0.587 * g * g) + (0.114 * b * b));

  return hsp;
}
