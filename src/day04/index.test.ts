import { exampleInput, puzzleInput } from "./input";
import {
  parseAssignments,
  countFullyContainedPairs,
  countOverlappingPairs,
} from "./index";

describe("Day 4", () => {
  it("parses input", () => {
    expect(parseAssignments(exampleInput)).toEqual([
      [
        [2, 4],
        [6, 8],
      ],
      [
        [2, 3],
        [4, 5],
      ],
      [
        [5, 7],
        [7, 9],
      ],
      [
        [2, 8],
        [3, 7],
      ],
      [
        [6, 6],
        [4, 6],
      ],
      [
        [2, 6],
        [4, 8],
      ],
    ]);
  });

  describe("part 1", () => {
    it("example", () => {
      expect(countFullyContainedPairs(parseAssignments(exampleInput))).toEqual(
        2
      );
    });

    it("puzzle", () => {
      expect(countFullyContainedPairs(parseAssignments(puzzleInput))).toEqual(
        576
      );
    });
  });

  describe("part 2", () => {
    it("example", () => {
      expect(countOverlappingPairs(parseAssignments(exampleInput))).toEqual(4);
    });

    it("puzzle", () => {
      expect(countOverlappingPairs(parseAssignments(puzzleInput))).toEqual(905);
    });
  });
});
