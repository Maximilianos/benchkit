export function generateRandomFloatArray({ size, min, max }) {
  return makeArray(size, () => randomFloatInRange(min, max));
}

export function generateRandomIntArray({ size, min, max }) {
  return makeArray(size, () => randomIntInRange(min, max));
}

export function randomIntInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 

export function randomFloatInRange(min, max) {
  return Math.random() * (max - min) + min;
}

export function makeArray(length, func) {
  return Array.from({ length }).map(func);
}
