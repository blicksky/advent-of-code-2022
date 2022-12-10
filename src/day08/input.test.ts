import { exampleInput, puzzleInput } from "./input";
import { parseTreeHeightGrid, countVisibleTrees } from "./index";

describe("Day 8", () => {
  describe("part 1", () => {
    it("example", () => {
      const exampleTreeHeightGrid = parseTreeHeightGrid(exampleInput);
      expect(countVisibleTrees(exampleTreeHeightGrid)).toEqual(21);
    });

    it("puzzle", () => {
      const puzzleTreeHeightGrid = parseTreeHeightGrid(puzzleInput);
      expect(countVisibleTrees(puzzleTreeHeightGrid)).toEqual(1796);
    });
  });
});
