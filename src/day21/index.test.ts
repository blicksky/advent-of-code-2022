import { parseInput, main } from "./index";
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

  describe.skip("part 2", () => {
    it("example input", () => {
      const input = parseInput(exampleInput);
      // expect(main()).toEqual(0);
    });

    it("puzzle input", () => {
      const input = parseInput(puzzleInput);
      // expect(main()).toEqual(0);
    });
  });
});
