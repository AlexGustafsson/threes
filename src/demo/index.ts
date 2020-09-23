import {readFileSync} from "fs";
import {resolve} from "path";

import {Router, Request, Response} from "express";

const router = Router();
export default router;

const demoPage = readFileSync(resolve(__dirname, "./index.html")).toString();

router.get("/", (_: Request, res: Response) => {
  res.contentType("text/html");
  res.send(demoPage);
});
