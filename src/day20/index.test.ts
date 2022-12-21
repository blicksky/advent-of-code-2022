import { parseInput, parseInput2, main, main2 } from "./index";
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

  describe("part 2", () => {
    it("example input", () => {
      const input = parseInput2(exampleInput);
      expect(main2(input)).toEqual(1623178306);
    });

    it("puzzle input", () => {
      const input = parseInput2(puzzleInput);
      expect(main2(input)).toEqual(17113168880158);
    });
  });
});
