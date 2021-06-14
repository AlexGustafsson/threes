import Debug from "debug";
const debug = Debug("threes:app");
import express from "express";
import {Request, Response, NextFunction} from "express";

import demo from "./demo";
import v1 from "./api/v1";

const PORT = process.env["THREES_PORT"] || 3000;
// Cache images for a month by default
const CACHE_DURATION = process.env["THREES_CACHE_DURATION"] || 60 * 60 * 24 * 30;

const app = express();

if (process.env.NODE_ENV && process.env.NODE_ENV === "production") {
  app.use((_: Request, res: Response, next: NextFunction) => {
    // Remove the powered-by header in production
    res.removeHeader("X-Powered-By");
    // Set the cache duration in production
    res.set("Cache-Control", `public, max-age=${CACHE_DURATION}`);
    next();
  });
}

// CORS middleware
app.use((_: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// GET endpoint for a suite of avatars, not available in production
if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
  app.use(demo);
}

// API v1
app.use("/api/v1", v1);

app.listen(PORT);
debug(`Listening on :${PORT}`);
