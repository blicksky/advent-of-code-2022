import { parseCave, simulateSand } from "./index";
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

  describe.skip("part 2", () => {
    it("example input", () => {
      const input = parseCave(exampleInput);
      // expect(simulateSand()).toEqual(0);
    });

    it("puzzle input", () => {
      const input = parseCave(puzzleInput);
      // expect(simulateSand()).toEqual(0);
    });
  });
});
