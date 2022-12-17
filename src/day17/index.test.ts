import { getGasJetSequence } from "./index";
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
