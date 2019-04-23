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

  floatBetween(min, max) {
    return (this.random() * (max - min)) + min;
  }

  intBetween(min, max) {
    return Math.floor((this.random() * (max - min + 1)) + min);
  }

  element(...values) {
    if (Array.isArray(values[0]))
      values = values[0];
    console.log(values);
    return values[this.intBetween(0, values.length)];
  }

  elements(count, values) {
    return new Array(count).fill().map(() => this.element(values));
  }
}

module.exports = Random;
