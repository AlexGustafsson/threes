import {Canvas, CanvasRenderingContext2D} from "skia-canvas";

import Random from "./random";
import styles from "./styles";

const MIN_WIDTH = 1;
const MIN_HEIGHT = 1;

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

// https://flatuicolors.com/palette/ru
const DEFAULT_PALETTE = [
  "#f3a683",
  "#f7d794",
  "#778beb",
  "#e77f67",
  "#cf6a87",
  "#f19066",
  "#f5cd79",
  "#546de5",
  "#e15f41",
  "#c44569",
  "#786fa6",
  "#f8a5c2",
  "#63cdda",
  "#ea8685",
  "#596275",
  "#574b90",
  "#f78fb3",
  "#3dc1d3",
  "#e66767",
  "#303952"
];

export interface GeneratorOptions {
  width: number,
  height: number,
  style: string,
  format: string,
  palette: string | null
}

export type GeneratorCallable = (ctx: CanvasRenderingContext2D, random: Random) => Promise<void>;

export default class Generator {
  generator: GeneratorCallable

  constructor(generator: GeneratorCallable) {
    this.generator = generator;
  }

  static byName(name: string): Generator | null {
    if (styles[name])
      return new Generator(styles[name].generator);

    return null;
  }

  async generate(seed: string, options: GeneratorOptions): Promise<Canvas> {
    const width = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, (typeof options.width === "number" && !Number.isNaN(options.width)) ? options.width : 320));
    const height = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, (typeof options.height === "number" && !Number.isNaN(options.height)) ? options.height : 320));

    const paletteName = options.palette || options.style;
    const palette = styles[paletteName].palette || DEFAULT_PALETTE;

    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext("2d");
    const random = new Random(seed);
    random.setPalette(palette);

    this.generator(ctx, random);

    return canvas;
  }
}
