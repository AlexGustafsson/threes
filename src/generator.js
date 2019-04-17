const debug = require('debug')('threes:generator');
const {createCanvas} = require('canvas')

async function generate(username) {
  debug(`Generating avatar for ${username}`);

  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');

  // Write "Awesome!"
  ctx.font = '30px Impact';
  ctx.rotate(0.1);
  ctx.fillText(username, 50, 100);

  // Draw line under text
  const text = ctx.measureText(username);
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath();
  ctx.lineTo(50, 102);
  ctx.lineTo(50 + text.width, 102);
  ctx.stroke();

  return canvas.createPNGStream();
}

module.exports = {
  generate
};
