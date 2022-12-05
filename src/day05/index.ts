export function parseStacksAndProcedureInputs(input: string): {
  stacks: StackSet;
  procedure: Procedure;
} {
  const [stacksInput, procedureInput] = input.split("\n\n");
  const stacks = parseStacks(stacksInput);
  const procedure = parseProcedure(procedureInput);
  return { stacks, procedure };
}

type StackSet = Map<number, Array<String>>;

function parseStacks(input: string) {
  const rows = input.split("\n").filter((row) => row.trim() !== "");
  const idRow = rows.pop()!;

  const stackIdIndices = Array.from(idRow, (char, index) => {
    return {
      stackId: parseInt(char, 10),
      index,
    };
  }).filter(({ stackId }) => Boolean(stackId));

  const stacks: StackSet = new Map<number, Array<String>>();
  stackIdIndices.forEach(({ stackId }) => {
    stacks.set(stackId, []);
  });

  rows.forEach((row) => {
    stackIdIndices.forEach(({ stackId, index }) => {
      const stack = stacks.get(stackId)!;
      const crate = row[index];
      if (crate?.trim() !== "") {
        stack.unshift(crate);
      }
    });
  });

  return stacks;
}

type Step = {
  readonly quantity: number;
  readonly fromStackId: number;
  readonly toStackId: number;
};

type Procedure = Readonly<Array<Step>>;

function parseProcedure(input: string): Procedure {
  return input
    .split("\n")
    .filter((row) => row.trim() !== "")
    .map((step) => {
      const [[, quantity, fromStackId, toStackId]] = step.matchAll(
        /move (\d+) from (\d+) to (\d+)/g
      );
      return {
        quantity: parseInt(quantity, 10),
        fromStackId: parseInt(fromStackId, 10),
        toStackId: parseInt(toStackId, 10),
      };
    });
}

export function executeProcedure(stacks: StackSet, procedure: Procedure): void {
  procedure.forEach(({ quantity, fromStackId, toStackId }) => {
    for (let i = 0; i < quantity; ++i) {
      const crate = stacks.get(fromStackId)!.pop()!;
      stacks.get(toStackId)!.push(crate);
    }
  });
}

export function execute9001Procedure(
  stacks: StackSet,
  procedure: Procedure
): void {
  procedure.forEach(({ quantity, fromStackId, toStackId }) => {
    const crates = stacks.get(fromStackId)!.splice(-quantity);
    stacks.get(toStackId)!.push(...crates);
  });
}

export function getTopCratesString(stacks: StackSet): string {
  return [...stacks.values()].map((crates) => crates.pop()).join("");
}
