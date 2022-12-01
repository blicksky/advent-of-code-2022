const sum = (items: Array<number>): number => {
  return items.reduce((sum, item) => sum + item);
};

export function findMost(input: Array<Array<number>>): number {
  return input
    .map((items) => sum(items))
    .reduce((max, sum) => Math.max(max, sum));
}

export function findTopThree(input: Array<Array<number>>): any {
  const sums = input.map((items) => sum(items));

  const maxes: [number, number, number] = [0, 0, 0];

  for (const sum of sums) {
    if (maxes[0] <= sum) {
      maxes[0] = sum;
    }

    maxes.sort((a, b) => a - b);
  }

  return sum(maxes);
}
