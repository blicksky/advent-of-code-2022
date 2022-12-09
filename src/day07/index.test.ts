import { exampleInput, puzzleInput } from "./input";
import { findSmallFiles } from "./index";

describe("Day 7", () => {
  describe("part 1 & 2", () => {
    it("example", () => {
      const { sumOfSmallSizes, sizeToDelete } = findSmallFiles(exampleInput);

      expect(sumOfSmallSizes).toEqual(95437);
      expect(sizeToDelete).toEqual(24933642);
    });

    it("puzzle", () => {
      const { sumOfSmallSizes, sizeToDelete } = findSmallFiles(puzzleInput);

      expect(sumOfSmallSizes).toEqual(1367870);
      expect(sizeToDelete).toEqual(549173);
    });
  });
});
