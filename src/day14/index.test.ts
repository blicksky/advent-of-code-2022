import { parseCave, main } from "./index";
import { exampleInput, puzzleInput } from "./input";

describe("Day 14", () => {
  describe("part 1", () => {
    it("example input", () => {
      const cave = parseCave(exampleInput);
      console.log(cave);
      // expect(main()).toEqual(0);
    });

    it.skip("puzzle input", () => {
      const input = parseCave(puzzleInput);
      expect(main()).toEqual(0);
    });
  });

  describe.skip("part 2", () => {
    it("example input", () => {
      const input = parseCave(exampleInput);
      expect(main()).toEqual(0);
    });

    it("puzzle input", () => {
      const input = parseCave(puzzleInput);
      expect(main()).toEqual(0);
    });
  });
});
