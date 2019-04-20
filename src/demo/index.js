const fs = require('fs');
const path = require('path');

function read(filename) {
  return fs.readFileSync(path.resolve(__dirname, filename)).toString();
}

module.exports = {
  source: read('./index.html'),
  generatorTemplate: read('./generator-template.html')
};
