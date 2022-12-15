import { parseCave, simulateSand, simulateSandWithFloor } from "./index";
import { exampleInput, puzzleInput } from "./input";

describe("Day 14", () => {
  describe("part 1", () => {
    it("example input", () => {
      const cave = parseCave(exampleInput);
      expect(simulateSand(cave)).toEqual(24);
    });

    it("puzzle input", () => {
      const cave = parseCave(puzzleInput);
      expect(simulateSand(cave)).toEqual(578);
    });
  });

  describe("part 2", () => {
    it("example input", () => {
      const cave = parseCave(exampleInput);
      expect(simulateSandWithFloor(cave)).toEqual(93);
    });

    it("example input", () => {
      const cave = parseCave(puzzleInput);
      expect(simulateSandWithFloor(cave)).toEqual(24377);
    });
  });
});
