import { parseInput, main, main2 } from "./index";
import { exampleInput, puzzleInput } from "./input";

describe("Day 21", () => {
  describe("part 1", () => {
    it("example input", async () => {
      const input = parseInput(exampleInput);
      expect(await main(input)).toEqual(152);
    });

    it("puzzle input", async () => {
      const input = parseInput(puzzleInput);
      expect(await main(input)).toEqual(80326079210554);
    });
  });

  describe("part 2", () => {
    it("example input", async () => {
      const input = parseInput(exampleInput);
      // X = 301
      expect(await main2(input)).toEqual("((4 + (2 * (X - 3))) / 4) = 150");
    });

    it("example input", async () => {
      const input = parseInput(puzzleInput);
      // X = 3617613952378
      expect(await main2(input)).toEqual(
        "((((134300707002780 - (2 * (((294 + ((((((747 + (((((2 * ((((((((2 * (((((((((((45 + (((2 * (3 + (((2 * ((((10 * ((((3 * ((((((389 + (19 * ((((126 + ((12 * (18 + X)) - 541)) + 831) / 8) - 755))) / 2) - 642) + 31) / 2) + 784)) - 31) / 7) + 472)) + 936) / 2) - 875)) - 306) / 2))) - 975) / 11)) * 11) + 344) / 8) - 26) * 9) - 925) / 2) + 892) * 2) + 223)) - 931) / 5) - 69) * 2) + 12) / 2) + 549)) - 41) / 11) - 560) * 3)) / 2) + 150) / 4) - 542) * 20)) / 2) - 519))) * 2) + 257) / 5) = 26605796414957"
      );
    });
  });
});
