const debug = require('debug')('threes:generator');
const {createCanvas} = require('canvas');

const Random = require('./random');
const generators = require('./generators');
const palettes = require('./palettes');

async function generate(username, options) {
  debug(`Generating avatar for ${username}`);

  options = Object.assign({
    format: null,
    style: 'threes',
    width: 320,
    height: 320
  }, options);

  const canvas = createCanvas(options.width, options.height, options.format);
  const ctx = canvas.getContext('2d');
  const random = new Random(username);

  if (generators[options.style]) {
    random.palette = palettes[options.style];
    generators[options.style](username, ctx, random, options);
  }

  return canvas;
}

module.exports = {
  generate
};
