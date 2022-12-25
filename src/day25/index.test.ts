import { parseInput, fromSNAFU, main } from "./index";
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
    it(`converts ${snafuNumber} SNAFU to ${decimalNumber}`, () => {
      expect(fromSNAFU(snafuNumber)).toEqual(decimalNumber);
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
