import { parseInput, fromSNAFU, toSNAFU, main } from "./index";
import { exampleInput, puzzleInput } from "./input";

describe("Day 25", () => {
  const snafuToDecimalExamples = [
    ["1=-0-2", 1747],
    ["12111", 906],
    ["2=0=", 198],
    ["21", 11],
    ["2=01", 201],
    ["111", 31],
    ["20012", 1257],
    ["112", 32],
    ["1=-1=", 353],
    ["1-12", 107],
    ["12", 7],
    ["1=", 3],
    ["122", 37],
  ] as [string, number][];

  snafuToDecimalExamples.forEach(([snafuNumber, decimalNumber]) => {
    it(`converts ${snafuNumber} SNAFU to ${decimalNumber} decimal`, () => {
      expect(fromSNAFU(snafuNumber)).toEqual(decimalNumber);
    });
  });

  const decimalToSnafuExamples = [
    [1, "1"],
    [2, "2"],
    [3, "1="],
    [4, "1-"],
    [5, "10"],
    [6, "11"],
    [7, "12"],
    [8, "2="],
    [9, "2-"],
    [10, "20"],
    [15, "1=0"],
    [20, "1-0"],
    [2022, "1=11-2"],
    [12345, "1-0---0"],
    [314159265, "1121-1110-1=0"],
  ] as [number, string][];

  decimalToSnafuExamples.forEach(([decimalNumber, snafuNumber]) => {
    it(`converts ${decimalNumber} decimal to ${snafuNumber} SNAFU`, () => {
      expect(toSNAFU(decimalNumber)).toEqual(snafuNumber);
    });
  });

  describe.skip("part 1", () => {
    it("example input", () => {
      const input = parseInput(exampleInput);
      expect(main()).toEqual(0);
    });

    it("puzzle input", () => {
      const input = parseInput(puzzleInput);
      expect(main()).toEqual(0);
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
