import { findMost, findTopThree } from ".";
import { exampleInput, puzzleInput } from "./input";

function parseInput(input: string) {
  return input
    .split("\n\n")
    .map((group) => group.split("\n").map((line) => parseInt(line, 10)));
}

describe("Day 1", () => {
  describe("part 1", () => {
    it("example input", () => {
      expect(findMost(parseInput(exampleInput))).toEqual(24000);
    });

    it("puzzle input", () => {
      expect(findMost(parseInput(puzzleInput))).toEqual(75501);
    });
  });

  describe("part 2", () => {
    it("example inpur", () => {
      expect(findTopThree(parseInput(exampleInput))).toEqual(45000);
    });

    it("puzzle input", () => {
      expect(findTopThree(parseInput(puzzleInput))).toEqual(215594);
    });
  });
});
