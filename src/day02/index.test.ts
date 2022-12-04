import { exampleInput, puzzleInput } from "./input";
import { getScoreByPlay, getScoreByOutcome } from "./index";

function parseInput(input: string): Array<[string, string]> {
  return input.split("\n").map((line) => {
    const [opponentPlay, youPlay] = line.split(/\s+/);
    return [opponentPlay, youPlay];
  });
}

describe("Day 2", () => {
  it("parses input", () => {
    expect(parseInput(exampleInput)).toEqual([
      ["A", "Y"],
      ["B", "X"],
      ["C", "Z"],
    ]);
  });

  describe("part 1", () => {
    it("example", () => {
      expect(getScoreByPlay(parseInput(exampleInput))).toEqual(15);
    });

    it("puzzle", () => {
      expect(getScoreByPlay(parseInput(puzzleInput))).toEqual(13221);
    });
  });

  describe("part 2", () => {
    it("example", () => {
      expect(getScoreByOutcome(parseInput(exampleInput))).toEqual(12);
    });

    it("puzzle", () => {
      expect(getScoreByOutcome(parseInput(puzzleInput))).toEqual(13131);
    });
  });
});
