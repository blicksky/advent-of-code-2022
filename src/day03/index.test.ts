import { exampleInput, puzzleInput } from "./input";
import {
  parseInput,
  sumCommonItemPriorities,
  sumGroupBadgePriorities,
} from "./index";

describe("Day 3", () => {
  it("parses input", () => {
    expect(parseInput(exampleInput)).toEqual([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ]);
  });

  describe("part 1", () => {
    it("example", () => {
      const exampleRucksacks = parseInput(exampleInput);
      expect(sumCommonItemPriorities(exampleRucksacks)).toEqual(157);
    });

    it("puzzle", () => {
      const puzzleRucksacks = parseInput(puzzleInput);
      expect(sumCommonItemPriorities(puzzleRucksacks)).toEqual(8394);
    });
  });

  describe("part 2", () => {
    it("example", () => {
      const exampleRucksacks = parseInput(exampleInput);
      expect(sumGroupBadgePriorities(exampleRucksacks)).toEqual(70);
    });

    it("puzzle", () => {
      const puzzleRucksacks = parseInput(puzzleInput);
      expect(sumGroupBadgePriorities(puzzleRucksacks)).toEqual(2413);
    });
  });
});
