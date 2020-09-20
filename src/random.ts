import seedrandom from "seedrandom";

/** Utility class for handling a random seed. */
export default class Random {
  random: seedrandom.prng
  palette: string[] | null

  /** Create a random object using the given seed. */
  constructor(seed: string) {
    this.random = seedrandom(seed);
    this.palette = null;
  }

  /** Set the palette used by the instance. */
  setPalette(palette: string[]) {
    this.palette = palette;
  }

  /** Get a random color from the current palette. */
  color() {
    if (!this.palette)
      throw new Error("No palette set");

    return this.palette[Math.floor(this.random() * this.palette.length)];
  }

  /** Get a random float. */
  float() {
    return this.random();
  }

  /** Get a random float between min (inc.) and max (excl.). */
  floatBetween(min: number, max: number) {
    return (this.random() * (max - min)) + min;
  }

  /** Get a random int between min (inc.) and max (excl.). */
  intBetween(min: number, max: number) {
    return Math.floor((this.random() * (max - min + 1)) + min);
  }

  /** Get a random element of the given values. */
  element(...values: any) {
    if (Array.isArray(values[0]))
      values = values[0];
    return values[this.intBetween(0, values.length - 1)];
  }

  /** Get one or more random elements from a list of values. */
  elements(count: number, values: any[]) {
    return new Array(count).fill(null).map(() => this.element(values));
  }

  /** Returns true with a probability roughly following the percentile given. */
  bool(percentile = 0.5) {
    return this.float() <= percentile;
  }
}

module.exports = Random;
