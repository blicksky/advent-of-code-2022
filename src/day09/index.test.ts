import { exampleInput } from "./input";
import { Direction, parseMotions } from "./index";

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
    it("example", () => {});

    it.skip("puzzle", () => {});
  });

  describe.skip("part 2", () => {
    it("example", () => {});

    it("puzzle", () => {});
  });
});
