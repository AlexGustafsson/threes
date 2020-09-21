import {GeneratorCallable} from "../generator";
import {Grid} from "../utils/grid";
import {Offset} from "../utils/geometry";

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
  const grid = new Grid(ctx, COLUMNS, ROWS);
  for (const cell of grid.cells) {
    cell.draw(ctx => {
      // Fill the background
      ctx.fillStyle = random.color();
      ctx.fillRect(cell.offset.left, cell.offset.top, cell.size.width, cell.size.height);

      const corners: Offset[] = [
        {left: cell.size.width, top: cell.size.height},
        {left: cell.size.width, top: 0},
        {left: cell.size.width, top: cell.size.height},
        {left: 0, top: cell.size.height}
      ].map(offset => cell.absoluteOffset(offset));

      const startCorner = random.intBetween(0, 3);

      const cornerA = corners[(startCorner + 0) % 4];
      const cornerB = corners[(startCorner + 1) % 4];
      const cornerC = corners[(startCorner + 2) % 4];

      // Draw a line between three of the corners
      ctx.beginPath();
      ctx.moveTo(cornerA.left, cornerA.top);
      ctx.lineTo(cornerB.left, cornerB.top);
      ctx.lineTo(cornerC.left, cornerC.top);

      // Create an arch or line to complete the path
      const startAngle = Math.atan2(cornerB.top - cornerC.top, cornerB.left - cornerC.left);
      const endAngle = Math.atan2(cornerA.top - cornerC.top, cornerA.left - cornerC.left);
      const radius = Math.abs(Math.sqrt(Math.pow(cornerB.left - cornerC.left, 2) + Math.pow(cornerB.top - cornerC.top, 2)));

      ctx.arc(cornerB.left, cornerB.top, radius, startAngle, endAngle);
      ctx.fillStyle = random.color();
      ctx.fill();
    });
  }
};
