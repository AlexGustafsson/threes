import {Canvas, CanvasRenderingContext2D} from "skia-canvas";

import Random from "./utils/random";
import styles from "./styles";

const MIN_WIDTH = 32;
const MIN_HEIGHT = 32;

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

export interface GeneratorOptions {
  width: number,
  height: number,
  style: string,
  format: string,
  palette: string | null
}

export type GeneratorCallable = (ctx: CanvasRenderingContext2D, random: Random, options: GeneratorOptions) => Promise<void>;

export default class Generator {
  generator: GeneratorCallable

  constructor(generator: GeneratorCallable) {
    this.generator = generator;
  }

  static byName(name: string): Generator | null {
    if (styles[name] && styles[name].generator)
      return new Generator(styles[name].generator as GeneratorCallable);

    return null;
  }

  async generate(seed: string, options: GeneratorOptions): Promise<Canvas> {
    const width = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, (typeof options.width === "number" && !Number.isNaN(options.width)) ? options.width : 320));
    const height = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, (typeof options.height === "number" && !Number.isNaN(options.height)) ? options.height : 320));

    const paletteName = options.palette || options.style;
    const palette = styles[paletteName].palette || styles["default"].palette as string[];

    const canvas = new Canvas(width, height);
    const ctx = canvas.getContext("2d");
    const random = new Random(seed);
    random.setPalette(palette);

    this.generator(ctx, random, options);

    return canvas;
  }
}
