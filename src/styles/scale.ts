import {GeneratorCallable} from "../generator";
import Random from "../utils/random";
import {Offset} from "../utils/geometry";

// Taken from: https://dribbble.com/shots/5838539-Bright-Fish-Scale-Pattern
export const palette = [
  "#00A29B",
  "#F68498",
  "#F2BC4B",
  "#282149",
  "#FFB3C3",
  "#E76234",
  "#F58397",
  "#F8F9EC"
];

// Taken from: https://dribbble.com/shots/5838539-Bright-Fish-Scale-Pattern
export const generator: GeneratorCallable = async (ctx, random) => {
  const backgroundColor = "#F8F9EC";
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const radius = 50;
  const verticalOffset = radius;

  const rows = Math.ceil((ctx.canvas.height + 2 * radius) / (2 * radius - verticalOffset)) + 1;
  const columns = Math.ceil((ctx.canvas.width + 2 * radius) / (2 * radius));

  let offset = true;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const origin = {
        top: ctx.canvas.height + (2 * radius) - (y * (2 * radius - verticalOffset)),
        left: offset ? -radius + (x * 2 * radius) : (x * 2 * radius)
      };
      drawCircle(ctx, random, origin, radius);
    }

    offset = !offset;
  }
};

function drawCircle(ctx: CanvasRenderingContext2D, random: Random, origin: Offset, radius: number) {
  ctx.fillStyle = random.color();
  ctx.strokeStyle = "#F8F9EC";
  ctx.lineWidth = Math.round(0.05 * radius);

  ctx.beginPath();
  ctx.arc(origin.left, origin.top, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}
