import {readFileSync} from "fs";
import {resolve} from "path";

function read(filename: string): string {
  return readFileSync(resolve(__dirname, filename)).toString();
}

export const demoPage = read("./index.html");
