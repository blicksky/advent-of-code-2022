import { parseNotes, runRound, calculateMonkeyBusinessLevel } from "./index";
import { exampleInput, puzzleInput } from "./input";

describe("Day 11", () => {
  it("parses input", () => {
    const exampleNotes = parseNotes(exampleInput);
    expect(exampleNotes).toEqual([
      {
        items: [79, 98],
        expression: "old * 19",
        testDivisor: 23,
        testPassedTargetMonkey: 2,
        testFailedTargetMonkey: 3,
        inspectionCount: 0,
      },
      {
        items: [54, 65, 75, 74],
        expression: "old + 6",
        testDivisor: 19,
        testPassedTargetMonkey: 2,
        testFailedTargetMonkey: 0,
        inspectionCount: 0,
      },
      {
        items: [79, 60, 97],
        expression: "old * old",
        testDivisor: 13,
        testPassedTargetMonkey: 1,
        testFailedTargetMonkey: 3,
        inspectionCount: 0,
      },
      {
        items: [74],
        expression: "old + 3",
        testDivisor: 17,
        testPassedTargetMonkey: 0,
        testFailedTargetMonkey: 1,
        inspectionCount: 0,
      },
    ]);
  });

  describe("part 1", () => {
    it("example input", () => {
      const monkeys = parseNotes(exampleInput);
      for (let i = 0; i < 20; ++i) {
        runRound(monkeys);
      }
      expect(calculateMonkeyBusinessLevel(monkeys)).toEqual(10605);
    });

    it("puzzle input", () => {
      const monkeys = parseNotes(puzzleInput);
      for (let i = 0; i < 20; ++i) {
        runRound(monkeys);
      }
      expect(calculateMonkeyBusinessLevel(monkeys)).toEqual(58056);
    });
  });

  describe.skip("part 2", () => {
    it("example input", () => {
      const notes = parseNotes(exampleInput);
      // expect(runRound()).toEqual(0);
    });

    it("puzzle input", () => {
      const notes = parseNotes(puzzleInput);
      // expect(runRound()).toEqual(0);
    });
  });
});
