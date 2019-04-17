const seedrandom = require('seedrandom');

const palette = require('./palette');

class Random {
  constructor(seed) {
    this.random = seedrandom(seed);
  }

  color() {
    return palette[Math.floor(this.random() * palette.length)];
  }

  float() {
    return this.random();
  }
}

module.exports = Random;
