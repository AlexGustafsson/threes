import {GeneratorCallable} from "../generator";

import {palette as defaultPalette} from "./default";
import {generator as charmGenerator, palette as charmPalette} from "./charm";
import {generator as githubGenerator, palette as githubPalette} from "./github";
import {generator as helsinkiGenerator, palette as helsinkiPalette} from "./helsinki";
import {generator as scaleGenerator, palette as scalePalette} from "./scale";
import {generator as scandinavianGenerator, palette as scandinavianPalette} from "./scandinavian";
import {generator as tributeGenerator, palette as tributePalette} from "./tribute";
import {generator as aztecGenerator, palette as aztecPalette} from "./aztec";
import {generator as gradientGenerator, palette as gradientPalette} from "./gradient";
import {generator as radialGenerator, palette as radialPalette} from "./radial";

export type Style = {generator?: GeneratorCallable, palette?: string[]};

export default {
  "default": {palette: defaultPalette},
  "charm": {generator: charmGenerator, palette: charmPalette},
  "github": {generator: githubGenerator, palette: githubPalette},
  "helsinki": {generator: helsinkiGenerator, palette: helsinkiPalette},
  "scale": {generator: scaleGenerator, palette: scalePalette},
  "scandinavian": {generator: scandinavianGenerator, palette: scandinavianPalette},
  "tribute": {generator: tributeGenerator, palette: tributePalette},
  "aztec": {generator: aztecGenerator, palette: aztecPalette},
  "gradient": {generator: gradientGenerator, palette: gradientPalette},
  "radial": {generator: radialGenerator, palette: radialPalette}
} as {[key: string]: Style};
