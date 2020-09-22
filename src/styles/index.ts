import {GeneratorCallable} from "../generator";

import {generator as charmGenerator, palette as charmPalette} from "./charm";
// import {generator as crossStitchGenerator, palette as crossStitchPalette} from "./cross-stitch";
// import {generator as fadedGenerator, palette as fadedPalette} from "./faded";
// import {generator as geometricGenerator, palette as geometricPalette} from "./geometric";
// import {generator as githubGenerator, palette as githubPalette} from "./github";
import {generator as helsinkiGenerator, palette as helsinkiPalette} from "./helsinki";
// import {generator as hexzagGenerator, palette as hexzagPalette} from "./hexzag";
// import {generator as pizzaGenerator, palette as pizzaPalette} from "./pizza";
// import {generator as scaleGenerator, palette as scalePalette} from "./scale";
import {generator as scandinavianGenerator, palette as scandinavianPalette} from "./scandinavian";
// import {generator as stackexchangeGenerator, palette as stackexchangePalette} from "./stackexchange";
// import {generator as threesGenerator, palette as threesPalette} from "./threes";
// import {generator as tributeGenerator, palette as tributePalette} from "./tribute";

export type Style = {generator: GeneratorCallable, palette?: string[]};

export default {
  "charm": {generator: charmGenerator, palette: charmPalette},
  // "cross-stitch": {generator: crossStitchGenerator, palette: crossStitchPalette},
  // "faded": {generator: fadedGenerator, palette: fadedPalette},
  // "geometric": {generator: geometricGenerator, palette: geometricPalette},
  // "github": {generator: githubGenerator, palette: githubPalette},
  "helsinki": {generator: helsinkiGenerator, palette: helsinkiPalette},
  // "hexzag": {generator: hexzagGenerator, palette: hexzagPalette},
  // "pizza": {generator: pizzaGenerator, palette: pizzaPalette},
  // "scale": {generator: scaleGenerator, palette: scalePalette},
  "scandinavian": {generator: scandinavianGenerator, palette: scandinavianPalette},
  // "stackexchange": {generator: stackexchangeGenerator, palette: stackexchangePalette},
  // "threes": {generator: threesGenerator, palette: threesPalette},
  // "tribute": {generator: tributeGenerator, palette: tributePalette}
} as {[key: string]: Style};
