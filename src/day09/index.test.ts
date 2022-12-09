import { exampleInput, puzzleInput } from "./input";
import { Direction, parseMotions, countTailPositions } from "./index";

describe("Day 9", () => {
  it("parses input", () => {
    const motions = parseMotions(exampleInput);

    expect(motions).toEqual([
      { direction: Direction.Right, distance: 4 },
      { direction: Direction.Up, distance: 4 },
      { direction: Direction.Left, distance: 3 },
      { direction: Direction.Down, distance: 1 },
      { direction: Direction.Right, distance: 4 },
      { direction: Direction.Down, distance: 1 },
      { direction: Direction.Left, distance: 5 },
      { direction: Direction.Right, distance: 2 },
    ]);
  });

  describe("part 1", () => {
    it("example", () => {
      const motions = parseMotions(exampleInput);
      expect(countTailPositions(motions)).toEqual(13);
    });

    it("puzzle", () => {
      const motions = parseMotions(puzzleInput);
      expect(countTailPositions(motions)).toEqual(6011);
    });
  });

  describe.skip("part 2", () => {
    it("example", () => {});

    it("puzzle", () => {});
  });
});
