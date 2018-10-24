export function genearateRandomArray({ size, minVal, maxVal }) {
  return makeArray(size, () => randomInRange(minVal, maxVal));
}

export function randomInRange(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function makeArray(length, func) {
  return Array.from({ length }).map(func);
}
