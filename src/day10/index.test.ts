import { exampleInput, largerExampleInput, puzzleInput } from "./input";
import { InstructionType, parseInput, executeInstructions } from "./index";

describe("Day 10", () => {
  it("parse instruction", () => {
    expect(parseInput(exampleInput)).toEqual([
      { type: InstructionType.Noop },
      { type: InstructionType.AddX, amount: 3 },
      { type: InstructionType.AddX, amount: -5 },
    ]);
  });

  describe("parts 1 & 2", () => {
    it("example", () => {
      const exampleInstructions = parseInput(largerExampleInput);
      const { signalStrengthSum, screen } =
        executeInstructions(exampleInstructions);

      expect(signalStrengthSum).toEqual(13140);

      expect(screen).toEqual([
        "##..##..##..##..##..##..##..##..##..##..",
        "###...###...###...###...###...###...###.",
        "####....####....####....####....####....",
        "#####.....#####.....#####.....#####.....",
        "######......######......######......####",
        "#######.......#######.......#######.....",
      ]);
    });

    it("puzzle", () => {
      const exampleInstructions = parseInput(puzzleInput);
      const { signalStrengthSum, screen } =
        executeInstructions(exampleInstructions);

      expect(signalStrengthSum).toEqual(17940);

      expect(screen).toEqual([
        // Z    C   B    A     J   F    J    Z
        "####..##..###...##....##.####...##.####.",
        "...#.#..#.#..#.#..#....#.#.......#....#.",
        "..#..#....###..#..#....#.###.....#...#..",
        ".#...#....#..#.####....#.#.......#..#...",
        "#....#..#.#..#.#..#.#..#.#....#..#.#....",
        "####..##..###..#..#..##..#.....##..####.",
      ]);
    });
  });
});
