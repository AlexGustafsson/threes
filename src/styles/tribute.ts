import {calculateHSP} from "../utils/color";
import {GeneratorCallable} from "../generator";
import Random from "../utils/random";
import {Offset} from "../utils/geometry";

// Taken from: https://dribbble.com/shots/1000766-A-tribute-to-Julio-Le-Parc
export const palette = [
  "#F7E061",
  "#FD6344",
  "#E33257",
  "#CD2563",
  "#95317F",
  "#65287F",
  "#3C3388",
  "#0530A2"
];

// Taken from: https://dribbble.com/shots/1000766-A-tribute-to-Julio-Le-Parc
export const generator: GeneratorCallable = async (ctx, random) => {
  const backgroundColor = random.color();
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const levels = random.intBetween(3, 10);
  const origin = {
    left: random.intBetween(ctx.canvas.width * 0.15, ctx.canvas.width * 0.85),
    top: random.intBetween(ctx.canvas.height * 0.15, ctx.canvas.height * 0.85),
  };
  const radius = Math.max(ctx.canvas.width, ctx.canvas.height);

  drawCircles(ctx, random, origin, levels, radius, backgroundColor);
};

function drawCircles(ctx: CanvasRenderingContext2D, random: Random, origin: Offset, levels: number, radius: number, background: string) {
  let previousRadius = null;
  for (let i = 0; i < levels; i++) {
    if (radius < 10)
      return;

    let foreground = random.color();
    while (foreground === background)
      foreground = random.color();

    if (previousRadius !== null) {
      ctx.save();
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.beginPath();
      ctx.arc(origin.left, origin.top, previousRadius, 0, 2 * Math.PI);
      ctx.clip();

      ctx.fillRect(origin.left, origin.top - radius, previousRadius, radius * 2);
      ctx.restore();
    }

    ctx.fillStyle = foreground;
    ctx.beginPath();
    ctx.arc(origin.left, origin.top, radius, 0, 2 * Math.PI);
    ctx.fill();

    previousRadius = radius;
    background = foreground;
    radius -= random.intBetween(25, 100);
  }
}
