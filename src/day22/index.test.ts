import { parseInput, main, Turn } from "./index";
import { exampleInput, puzzleInput } from "./input";

describe("Day 22", () => {
  it("parses input", () => {
    const [board, path] = parseInput(exampleInput);

    expect(board.tileMap.size).toEqual(96);
    expect(board.boundsByRow.size).toEqual(12);
    expect(board.boundsByColumn.size).toEqual(16);
    expect(path).toEqual([
      10,
      Turn.Clockwise,
      5,
      Turn.CounterClockwise,
      5,
      Turn.Clockwise,
      10,
      Turn.CounterClockwise,
      4,
      Turn.Clockwise,
      5,
      Turn.CounterClockwise,
      5,
    ]);
  });

  describe.skip("part 1", () => {
    it("example input", () => {
      const input = parseInput(exampleInput);
      expect(main()).toEqual(0);
    });

    it("puzzle input", () => {
      const input = parseInput(puzzleInput);
      expect(main()).toEqual(0);
    });
  });

  describe.skip("part 2", () => {
    it("example input", () => {
      const input = parseInput(exampleInput);
      expect(main()).toEqual(0);
    });

    it("puzzle input", () => {
      const input = parseInput(puzzleInput);
      expect(main()).toEqual(0);
    });
  });
});
