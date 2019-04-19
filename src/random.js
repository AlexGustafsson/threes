const seedrandom = require('seedrandom');

class Random {
  constructor(seed) {
    this.random = seedrandom(seed);
    this.palette = null;
  }

  setPalette(palette) {
    this.palette = palette;
  }

  color() {
    if (!this.palette)
      throw new Error('No palette set');

    return this.palette[Math.floor(this.random() * this.palette.length)];
  }

  float() {
    return this.random();
  }
}

module.exports = Random;
