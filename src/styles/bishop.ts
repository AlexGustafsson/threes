import { GeneratorCallable } from "../generator";
import Random from "../utils/random";
import { Offset } from "../utils/geometry";

const GRID_WIDTH = 9;
const GRID_HEIGHT = 9;

const moves = [
  {x: -1, y: -1},
  {x: +1, y: -1},
  {x: -1, y: +1},
  {x: +1, y: +1},
];

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

export const generator: GeneratorCallable = async (ctx, random) => {
  const backgroundColor = "#F8F9EC";
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  let bishop = {
    x: Math.round(GRID_WIDTH / 2),
    y: Math.round(GRID_HEIGHT / 2)
  };

  let board = new Array(GRID_WIDTH * GRID_HEIGHT).fill(0) as Array<number>;
  let steps = 100;

  for (let i = 0; i < steps; i++) {
    const move = random.element(...moves);
    bishop.x = Math.min(Math.max(bishop.x - move.x, 0), GRID_WIDTH - 1);
    bishop.y = Math.min(Math.max(bishop.y - move.y, 0), GRID_HEIGHT - 1);
    board[bishop.y * GRID_WIDTH + bishop.x] += 1;
  }

  const maxOccurances = Math.max(...board);

  for (let y = 0; y < GRID_HEIGHT; y++) {
    for (let x = 0; x < GRID_WIDTH; x++) {
      const occurances = board[y * GRID_WIDTH + x];
      if (occurances > 0) {
        drawCircle(ctx, random, { top: y * (ctx.canvas.height / GRID_HEIGHT), left: x * (ctx.canvas.width / GRID_WIDTH) }, occurances, maxOccurances);
      }
    }
  }
};

function drawCircle(ctx: CanvasRenderingContext2D, random: Random, origin: Offset, occurances: number, maxOccurances: number) {
  ctx.fillStyle = random.palette![occurances % random.palette!.length]
  ctx.strokeStyle = "#F8F9EC";

  const invertedOccurances = maxOccurances - occurances;
  const offset = {
    left: Math.min(invertedOccurances, 10) * random.float(),
    top: Math.min(invertedOccurances, 10) * random.float()
  };

  const radius = Math.min(5 + occurances, 10);

  ctx.beginPath();
  ctx.arc(origin.left + offset.left, origin.top + offset.top, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}
