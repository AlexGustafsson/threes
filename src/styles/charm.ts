import {GeneratorCallable} from "../generator";
import {HexGrid} from "../utils/grid";
import {Hexagon, Arch, Polygon} from "../utils/geometry";

const SIZE = 10;

// Taken from: https://dribbble.com/shots/6679208--Charm-Pattern
export const palette = [
  "#3ABAAD",
  "#D52B5F",
  "#336091",
  "#FBF3D7",
  "#F69257",
  "#4D235B"
];

// Inspired by: https://dribbble.com/shots/6679208--Charm-Pattern
export const generator: GeneratorCallable = async (ctx, random) => {
  const backgroundColor = "#FBF3D7";
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const grid = new HexGrid(ctx, SIZE, SIZE, Math.max(ctx.canvas.width, ctx.canvas.height) / SIZE);
  for (const cell of grid.cells) {
    cell.fill(random.color());

    const points = random.sequence(3, (cell.shape as Hexagon).points);
    const arch = new Arch(points[0], points[2], (cell.shape as Hexagon).center);
    const triangle = new Polygon(...points);
    cell.draw(ctx => {
      ctx.fillStyle = random.color();
      ctx.beginPath();
      triangle.draw(ctx);
      arch.draw(ctx);
      ctx.fill();
    });
  }
};
