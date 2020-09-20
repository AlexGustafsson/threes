import Debug from "debug";
const debug = Debug("threes:app");
import express from "express";
import {Request, Response, NextFunction} from "express";

import styles from "./styles";
import Generator from "./generator";
import demo from "./demo";

const PORT = process.env["THREES_PORT"] || 3000;
// Cache images for a month by default
const CACHE_DURATION = process.env["THREES_CACHE_DURATION"] || 60 * 60 * 24 * 30;

const app = express();

const supportedMimeTypes: {[key: string]: string} = {
  "png": "image/png",
  "jpg": "image/jpg",
  "jpeg": "image/jpg",
  "svg": "image/svg+xml"
};

if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
  app.use((_: Request, res: Response, next: NextFunction) => {
    // Remove the powered-by header in production
    res.removeHeader("X-Powered-By");
    // Set the cache duration in production
    res.set("Cache-Control", `public, max-age=${CACHE_DURATION}`);
    next();
  });
}

// GET endpoint for a suite of avatars, not available in production
if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
  app.get("/suite/:seed", (req: Request, res: Response) => {
    res.contentType("text/html");
    const {seed} = req.params;
    let body = "";
    for (const style of Object.keys(styles))
      body += demo.generatorTemplate.replace(/\{\{style\}\}/g, style).replace(/\{\{seed\}\}/g, seed);
    res.send(demo.source.replace(/\{\{body\}\}/g, body));
  });
}

async function processStyle(req: Request, res: Response) {
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
    const buffer = canvas.toBuffer(format);
    res.send(buffer);
    debug(`Generated avatar seed=${seed} style=${style} format=${format}`);
  } catch (error) {
    debug(`Got an error while generating avatar seed=${seed} style=${style} format=${format}`);
    console.error(error);
    res.status(500);
    return res.end();
  }
}

// GET endpoint for a single style and seed
app.get("/avatar/:style/:seed.:format", async (req: Request, res: Response) => {
  processStyle(req, res);
});

// GET endpoint for all available styles
app.get("/styles", (req: Request, res: Response) => {
  res.contentType("application/json");
  res.send(JSON.stringify(Object.keys(styles)));
});

app.listen(PORT);
debug(`Listening on :${PORT}`);
