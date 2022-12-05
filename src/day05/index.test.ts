import { exampleInput, puzzleInput } from "./input";
import {
  parseStacksAndProcedureInputs,
  executeProcedure,
  getTopCratesString,
} from "./index";

describe("Day 5", () => {
  it("parses input", () => {
    const { stacks, procedure } = parseStacksAndProcedureInputs(exampleInput);

    expect(stacks).toEqual(
      new Map([
        [1, ["Z", "N"]],
        [2, ["M", "C", "D"]],
        [3, ["P"]],
      ])
    );

    expect(procedure).toEqual([
      { quantity: 1, fromStackId: 2, toStackId: 1 },
      { quantity: 3, fromStackId: 1, toStackId: 3 },
      { quantity: 2, fromStackId: 2, toStackId: 1 },
      { quantity: 1, fromStackId: 1, toStackId: 2 },
    ]);
  });

  describe("part 1", () => {
    it("example", () => {
      const { stacks, procedure } = parseStacksAndProcedureInputs(exampleInput);
      executeProcedure(stacks, procedure);
      expect(getTopCratesString(stacks)).toEqual("CMZ");
    });

    it("puzzle", () => {
      const { stacks, procedure } = parseStacksAndProcedureInputs(puzzleInput);
      executeProcedure(stacks, procedure);
      expect(getTopCratesString(stacks)).toEqual("RTGWZTHLD");
    });
  });

  // describe("part 2", () => {
  //   it("example", () => {
  //     expect(countOverlappingPairs(parseAssignments(exampleInput))).toEqual(4);
  //   });

  //   it("puzzle", () => {
  //     expect(countOverlappingPairs(parseAssignments(puzzleInput))).toEqual(905);
  //   });
  // });
});
