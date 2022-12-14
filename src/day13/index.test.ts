import { parseInput, main } from "./index";
import { exampleInput, puzzleInput } from "./input";

type Value = number | Value[];
type PacketData = [Value];

function parsePacketData(input: string): PacketData {
  return eval(input);
}

function isNumber(value: Value): value is number {
  return typeof value === "number";
}

function isList(value: Value): value is Value[] {
  return Array.isArray(value);
}

const enum ValueComparison {
  LeftGreater = 1,
  Equal = 0,
  LeftLesser = -1,
}

function numberComparator(left: number, right: number): ValueComparison {
  return Math.sign(left - right);
}

function listComparator(left: Value[], right: Value[]): ValueComparison {
  for (let i = 0; i < left.length && i < right.length; ++i) {
    const leftValue = left[i];
    const rightValue = right[i];

    const valueComparison = valueComparator(leftValue, rightValue);
    if (valueComparison !== 0) {
      return valueComparison;
    }
  }

  return numberComparator(left.length, right.length);
}

function valueComparator(left: Value, right: Value): ValueComparison {
  if (isNumber(left) && isNumber(right)) {
    return numberComparator(left, right);
  } else if (isList(left) && isList(right)) {
    return listComparator(left, right);
  } else if (isNumber(left) && isList(right)) {
    return listComparator([left], right);
  } else if (isList(left) && isNumber(right)) {
    return listComparator(left, [right]);
  }

  return ValueComparison.Equal;
}

function isInTheRightOrder(left: Value, right: Value): boolean {
  return valueComparator(left, right) === ValueComparison.LeftLesser;
}

describe("Day 13", () => {
  describe("part 1", () => {
    it("example input", () => {
      const pairInputs = exampleInput.split("\n\n");

      const result = pairInputs.reduce(
        (sumOfIndicespairInput, pairInput, i) => {
          const [left, right] = pairInput.split("\n").map(parsePacketData);
          return (
            sumOfIndicespairInput + (isInTheRightOrder(left, right) ? i + 1 : 0)
          );
        },
        0
      );

      expect(result).toEqual(13);
    });

    const inTheRightOrder = ValueComparison.LeftLesser;
    const notInTheRighrOrder = ValueComparison.LeftGreater;
    [
      [[1, 1, 3, 1, 1], [1, 1, 5, 1, 1], inTheRightOrder],
      [[[1], [2, 3, 4]], [[1], 4], inTheRightOrder],
      [[9], [[8, 7, 6]], notInTheRighrOrder],
      [[[4, 4], 4, 4], [[4, 4], 4, 4, 4], inTheRightOrder],
      [[7, 7, 7, 7], [7, 7, 7], notInTheRighrOrder],
      [[], [3], inTheRightOrder],
      [[[[]]], [[]], notInTheRighrOrder],
      [
        [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
        notInTheRighrOrder,
      ],
    ].forEach(([left, right, comparison], i) => {
      it(`example pair ${i + 1}`, () => {
        expect(valueComparator(left, right)).toEqual(comparison);
      });
    });

    it("puzzle input", () => {
      const pairInputs = puzzleInput.split("\n\n");

      const result = pairInputs.reduce(
        (sumOfIndicespairInput, pairInput, i) => {
          const [left, right] = pairInput.split("\n").map(parsePacketData);
          return (
            sumOfIndicespairInput + (isInTheRightOrder(left, right) ? i + 1 : 0)
          );
        },
        0
      );

      expect(result).toEqual(5852);
    });
  });

  describe.skip("part 2", () => {
    it("example input", () => {
      const input = parseInput(exampleInput);
      expect(main()).toEqual(0);
    });

    it("puzzle input", () => {
      const input = parseInput(puzzleInput);
      expect(main()).toEqual(0);
    });
  });
});
