import {
  findMost,
  findTopThree,
  findTopThreeFunctional,
  findTopThreeBySorting,
} from ".";
import { exampleInput, puzzleInput } from "./input";

function parseInput(input: string) {
  return input
    .split("\n\n")
    .map((group) => group.split("\n").map((line) => parseInt(line, 10)));
}

const parsedExampleInput = parseInput(exampleInput);
const parsedPuzzleInput = parseInput(puzzleInput);

const PART1_EXAMPLE_ANSWER = 24000;
const PART1_PUZZLE_ANSWER = 75501;
const PART2_EXAMPLE_ANSWER = 45000;
const PART2_PUZZLE_ANSWER = 215594;

describe("Day 1", () => {
  describe("part 1", () => {
    it("example input", () => {
      expect(findMost(parsedExampleInput)).toEqual(PART1_EXAMPLE_ANSWER);
    });

    it("puzzle input", () => {
      expect(findMost(parsedPuzzleInput)).toEqual(PART1_PUZZLE_ANSWER);
    });
  });

  describe("part 2", () => {
    it("example input", () => {
      expect(findTopThree(parsedExampleInput)).toEqual(PART2_EXAMPLE_ANSWER);
    });

    it("puzzle input", () => {
      expect(findTopThree(parsedPuzzleInput)).toEqual(PART2_PUZZLE_ANSWER);
    });
  });

  describe("part 2 functional", () => {
    it("example input", () => {
      expect(findTopThreeFunctional(parsedExampleInput)).toEqual(
        PART2_EXAMPLE_ANSWER
      );
    });

    it("puzzle input", () => {
      expect(findTopThreeFunctional(parsedPuzzleInput)).toEqual(
        PART2_PUZZLE_ANSWER
      );
    });
  });

  describe("part 2 by sorting", () => {
    it("example input", () => {
      expect(findTopThreeBySorting(parsedExampleInput)).toEqual(
        PART2_EXAMPLE_ANSWER
      );
    });

    it("puzzle input", () => {
      expect(findTopThreeBySorting(parsedPuzzleInput)).toEqual(
        PART2_PUZZLE_ANSWER
      );
    });
  });
});
