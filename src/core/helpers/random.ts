export function generateRandomNumber(min: number, max: number, numAfterDigit = 0): number {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomNumber(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[]): T[] {
  const start = generateRandomNumber(0, items.length - 1);
  const end = start + generateRandomNumber(start, items.length);
  return items.slice(start, end);
}

export function getRandomBoolean(): boolean {
  return Boolean(generateRandomNumber(0, 1));
}

const COORDINATE_ACCURACY = 6;
const COORDINATE_DIFFERENCE = 0.5;

export function getNearRandomCoordinate(coordinate: number): number {
  return +(coordinate + generateRandomNumber(
    -COORDINATE_DIFFERENCE,
    COORDINATE_DIFFERENCE,
    COORDINATE_ACCURACY,
  )).toFixed(COORDINATE_ACCURACY);
}
