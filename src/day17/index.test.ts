import {
  main,
  GasJet,
  getGasJetSequence,
  getRockSequence,
  RockShape,
} from "./index";
import { exampleInput, puzzleInput } from "./input";

describe("Day 17", () => {
  it("produces gas jet directions", () => {
    const gasJetSequence = getGasJetSequence(exampleInput);

    const gasJetDirections = [];
    for (let i = 0; i < exampleInput.length * 2; i += 1) {
      gasJetDirections.push(gasJetSequence.next().value);
    }

    expect(gasJetDirections[0]).toEqual(GasJet.Right);

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

  describe("part 1", () => {
    it("example input", () => {
      expect(main(exampleInput, 2022)).toEqual(3068);
    });

    it("puzzle input", () => {
      expect(main(puzzleInput, 2022)).toEqual(3065);
    });
  });

  describe("part 2", () => {
    it.skip("example input", () => {
      /*
      Ideas:
      - record the first three drops for each shape/gas-jet-sequence-position pair,
        as there are always 3 unobstructed lines, so it should always move the
        same way. Could even improve that by looking ahead to the next 3 gas-jet
        directions, and use that as the key for recording.
        - maybe could extend that to sequences beyond 3 if you include the pattern
          of the stopped rocks for each line down that you want to extend the
          sequence by. So, 4 drops if you include the top-most line of stopped
          rocks in the key, 5 drops if you include 2 top-most, etc.
      - cut off all points below when a new floor is found, though I'm not sure the
        storage of points is an issue, because this seems to run in linear time
      */
      expect(main(puzzleInput, 1000000000000)).toEqual(1514285714288);
    });

    it.skip("puzzle input", () => {
      // const input = parseInput(puzzleInput);
      // expect(main()).toEqual(0);
    });
  });
});
