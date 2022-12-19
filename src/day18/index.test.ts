import { parseCubes, main } from "./index";
import { exampleInput, largerExampleInput, puzzleInput } from "./input";

describe("Day 18", () => {
  describe("part 1", () => {
    it("example input", () => {
      const cubes = parseCubes(exampleInput);
      expect(main(cubes)).toEqual(10);
    });

    it("larger example input", () => {
      const cubes = parseCubes(largerExampleInput);
      expect(main(cubes)).toEqual(64);
    });

    it.only("puzzle input", () => {
      const cubes = parseCubes(puzzleInput);
      expect(main(cubes)).toEqual(3530);
    });
  });

  describe.skip("part 2", () => {
    it("example input", () => {
      const cubes = parseCubes(exampleInput);
      expect(main(cubes)).toEqual(0);
    });

    it("puzzle input", () => {
      const cubes = parseCubes(puzzleInput);
      expect(main(cubes)).toEqual(0);
    });
  });
});
