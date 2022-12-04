const sum = (items: Array<number>): number => {
  return items.reduce((sum, item) => sum + item);
};

export function findMost(input: Array<Array<number>>): number {
  return Math.max(...input.map(sum));
}

export function findTopThree(input: Array<Array<number>>): any {
  const sums = input.map(sum);

  const maxes: [number, number, number] = [0, 0, 0];

  for (const sum of sums) {
    if (maxes[0] <= sum) {
      maxes[0] = sum;
    }

    maxes.sort((a, b) => a - b);
  }

  return sum(maxes);
}

const ascending = (a: number, b: number): number => a - b;

export function findTopThreeFunctional(input: Array<Array<number>>): any {
  return sum(
    input.map(sum).reduce(
      ([smallest, ...others], sum) => {
        return [sum > smallest ? sum : smallest, ...others].sort(ascending);
      },
      [0, 0, 0]
    )
  );
}

const descending = (a: number, b: number): number => b - a;

export function findTopThreeBySorting(input: Array<Array<number>>): any {
  return sum(input.map(sum).sort(descending).slice(0, 3));
}
