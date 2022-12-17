import { getGasJetSequence, getRockSequence, RockShape } from "./index";
import { exampleInput, puzzleInput } from "./input";

describe("Day 17", () => {
  it("produces gas jet directions", () => {
    const gasJetSequence = getGasJetSequence(exampleInput);

    const gasJetDirections = [];
    for (let i = 0; i < exampleInput.length * 2; i += 1) {
      gasJetDirections.push(gasJetSequence.next().value);
    }

    expect(gasJetDirections).toEqual([...exampleInput, ...exampleInput]);
  });

  it("produces rock shapes", () => {
    const rockSequence = getRockSequence();

    const rocks = [];
    for (let i = 0; i < 16; i += 1) {
      rocks.push(rockSequence.next().value);
    }

    expect(rocks[0]).toEqual(RockShape.HorizontalLine);
    expect(rocks[1]).toEqual(RockShape.Plus);
    expect(rocks[2]).toEqual(RockShape.Hook);
    expect(rocks[3]).toEqual(RockShape.VerticalLine);
    expect(rocks[4]).toEqual(RockShape.Square);
    expect(rocks[5]).toEqual(RockShape.HorizontalLine);
    expect(rocks[10]).toEqual(RockShape.HorizontalLine);
    expect(rocks[15]).toEqual(RockShape.HorizontalLine);
  });

  describe.skip("part 1", () => {
    it("example input", () => {
      // const input = parseInput(exampleInput);
      // expect(main()).toEqual(0);
    });

    it("puzzle input", () => {
      // const input = parseInput(puzzleInput);
      // expect(main()).toEqual(0);
    });
  });

  describe.skip("part 2", () => {
    it("example input", () => {
      // const input = parseInput(exampleInput);
      // expect(main()).toEqual(0);
    });

    it("puzzle input", () => {
      // const input = parseInput(puzzleInput);
      // expect(main()).toEqual(0);
    });
  });
});
