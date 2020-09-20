import {readFileSync} from "fs";
import {resolve} from "path";

function read(filename: string) {
  return readFileSync(resolve(__dirname, filename)).toString();
}

export default {
  source: read("./index.html"),
  generatorTemplate: read("./style-template.html")
};
