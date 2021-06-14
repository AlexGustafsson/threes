import { alea } from "seedrandom";

/** Utility class for handling a random seed. */
export default class Random {
  random: ReturnType<typeof alea>
  palette: string[] | null

  /** Create a random object using the given seed. */
  constructor(seed: string) {
    this.random = alea(seed);
    this.palette = null;
  }

  /** Set the palette used by the instance. */
  setPalette(palette: string[]) {
    this.palette = palette;
  }

  /** Get a random color from the current palette. */
  color(): string {
    if (!this.palette)
      throw new Error("No palette set");

    return this.palette[Math.floor(this.random() * this.palette.length)];
  }

  /** Get a random float. */
  float(): number {
    return this.random();
  }

  /** Get a random float between min (inc.) and max (excl.). */
  floatBetween(min: number, max: number): number {
    return (this.random() * (max - min)) + min;
  }

  /** Get a random int between min (inc.) and max (excl.). */
  intBetween(min: number, max: number): number {
    return Math.floor((this.random() * (max - min)) + min);
  }

  /** Get a random element of the given values. */
  element<T>(...values: T[]): T {
    return values[this.intBetween(0, values.length - 1)];
  }

  /** Get one or more random elements from a list of values. */
  elements<T>(count: number, values: T[]): T[] {
    return new Array(count).fill(null).map(() => this.element(...values));
  }

  /** Get one or more random non-repeating elements from a list of values. */
  combination<T>(count: number, values: T[]): T[] {
    const picked = [];
    const slice = values.slice();
    for (let i = 0; i < count && slice.length > 0; i++) {
      const index = this.intBetween(0, slice.length);
      picked.push(slice[index]);
      slice.splice(index, 1);
    }

    return picked;
  }

  /** Get a random sequence from a list of values. */
  sequence<T>(count: number, values: T[]): T[] {
    const picked = [];
    const start = this.intBetween(0, values.length);
    for (let i = 0; i < count && i < values.length; i++)
      picked.push(values[(i + start) % values.length]);

    return picked;
  }

  /** Returns true with a probability roughly following the percentile given. */
  bool(percentile = 0.5): boolean {
    return this.float() <= percentile;
  }
}

module.exports = Random;
