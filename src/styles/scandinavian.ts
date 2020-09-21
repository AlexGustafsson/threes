import {GeneratorCallable} from "../generator";
import {SquareGrid} from "../utils/grid";
import {Circle, Polygon, Shape} from "../utils/geometry";

const ROWS = 4;
const COLUMNS = 4;

// Several sources, search for "Minimalistic Geometric Scandinavian"
export const palette = [
  "#37313F",
  "#A09EB1",
  "#EAE0E1",
  "#E0B4C1",
  "#C13E68",
  "#404B78",
  "#0EB285"
];

// Several sources, search for "Minimalistic Geometric Scandinavian"
export const generator: GeneratorCallable = async (ctx, random) => {
  const grid = new SquareGrid(ctx, COLUMNS, ROWS);
  for (const cell of grid.cells) {
    cell.draw(ctx => {
      // Fill the background
      ctx.fillStyle = random.color();
      ctx.fillRect(cell.shape.offset.left, cell.shape.offset.top, cell.shape.size.width, cell.shape.size.height);

      // Gather three random points
      const points = random.sequence(3, (cell.shape as Polygon).points);

      // Draw either a circle or a triangle for the points
      ctx.beginPath();
      let shape: Shape;
      if (random.bool())
        shape = new Circle(points[0], Math.max(cell.shape.size.width, cell.shape.size.height));
      else
        shape = new Polygon(...points);
      shape.draw(ctx);
      ctx.fillStyle = random.color();
      ctx.fill();
    });
  }
};
