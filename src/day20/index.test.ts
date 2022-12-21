import { parseInput, main } from "./index";
import { exampleInput, puzzleInput } from "./input";

describe("Day 20", () => {
  describe("part 1", () => {
    it("example input", () => {
      const input = parseInput(exampleInput);
      expect(main(input)).toEqual(3);
    });

    it("puzzle input", () => {
      const input = parseInput(puzzleInput);
      expect(main(input)).toEqual(13522);
    });
  });

  describe.skip("part 2", () => {
    it("example input", () => {
      const input = parseInput(exampleInput);
      expect(main(input)).toEqual(0);
    });

    it("puzzle input", () => {
      const input = parseInput(puzzleInput);
      expect(main(input)).toEqual(0);
    });
  });
});
