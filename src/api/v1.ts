import {Router, Request, Response} from "express";
import Debug from "debug";
const debug = Debug("threes:api");

import styles from "../styles";
import {Style} from "../styles";
import Generator from "../generator";

const router = Router();
export default router;

const supportedMimeTypes: {[key: string]: string} = {
  "png": "image/png",
  "jpg": "image/jpg",
  "jpeg": "image/jpg",
  "svg": "image/svg+xml"
};

async function processStyle(req: Request, res: Response) {
  const start = process.hrtime.bigint();
  const {seed, style, format} = req.params;

  const mime = supportedMimeTypes[format];
  if (!mime) {
    res.status(404);
    return res.end();
  }

  const generator = Generator.byName(style);
  if (generator == null) {
    res.status(404);
    return res.end();
  }

  const width = Number.parseInt(req.query["width"] as string);
  const height = Number.parseInt(req.query["height"] as string);
  const palette = req.query["palette"] as string | null;

  try {
    const canvas = await generator.generate(seed, {width, height, style, format, palette});
    res.contentType(mime);
    const buffer = await canvas.toBuffer(format);
    res.send(buffer);
    const end = process.hrtime.bigint();
    const duration = (end - start) / 1000000n;
    debug(`Generated avatar seed='${seed}' style=${style} format=${format} duration=${duration}ms`);
  } catch (error) {
    debug(`Got an error while generating avatar seed='${seed}' style=${style} format=${format}`);
    console.error(error);
    res.status(500);
    return res.end();
  }
}

// GET endpoint for a single style and seed
router.get("/avatar/:style/:seed.:format", async (req: Request, res: Response) => {
  processStyle(req, res);
});

// GET endpoint for a palette
router.get("/palette/:style", (req: Request, res: Response) => {
  const {style} = req.params;
  const palette: string[] | null = styles[style] ? styles[style].palette || null : null;
  if (!palette) {
    res.status(404);
    return res.end();
  }

  res.contentType("application/json");
  res.send(JSON.stringify(palette));
});

router.get("/palettes", (_: Request, res: Response) => {
  const palettes: {[key: string]: string[]} = {};
  for (const [name, {palette}] of Object.entries(styles) as [string, Style][]) {
    if (palette)
      palettes[name] = palette;
  }
  res.contentType("application/json");
  res.send(JSON.stringify(palettes));
});

// GET endpoint for all available styles
router.get("/styles", (_: Request, res: Response) => {
  res.contentType("application/json");
  res.send(JSON.stringify(Object.keys(styles).filter(style => styles[style].generator)));
});
