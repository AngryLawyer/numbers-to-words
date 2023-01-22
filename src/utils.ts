export function range(start: number, end: number): number[] {
  return [...Array(end - start).keys()].map((v) => v + start);
}

export function headAndTail<T>(array: readonly T[]): [T, readonly T[]] {
  return [array[0], array.slice(1)];
}
