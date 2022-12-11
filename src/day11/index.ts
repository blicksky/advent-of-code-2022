type Monkey = {
  items: number[];
  expression: string;
  testDivisor: number;
  testPassedTargetMonkey: number;
  testFailedTargetMonkey: number;
};

export function parseNotes(input: string): Monkey[] {
  const monkeyInputs = input.split("\n\n");
  return monkeyInputs.map((monkeyInput) => {
    const [
      ,
      startingItemsInput,
      operationInput,
      testInput,
      testPassedInput,
      testFailedInput,
    ] = monkeyInput.split("\n");

    const [, startingItems] = startingItemsInput
      .split("Starting items: ")
      .map((part) => part.split(",").map((item) => parseInt(item, 10)));

    const [, expression] = operationInput.split("Operation: new = ");

    const [, testDivisor] = testInput
      .split("Test: divisible by ")
      .map((part) => parseInt(part, 10));

    const [, testPassedTargetMonkey] = testPassedInput
      .split("If true: throw to monkey ")
      .map((part) => parseInt(part, 10));

    const [, testFailedTargetMonkey] = testFailedInput
      .split("If false: throw to monkey ")
      .map((part) => parseInt(part, 10));

    return {
      items: startingItems,
      expression,
      testDivisor,
      testPassedTargetMonkey,
      testFailedTargetMonkey,
    };
  });
}

function performOperation(oldValue: number, operation: string): number {
  const [, expression] = operation.split(" = ");
  const old = oldValue; // used in expression
  return eval(expression);
}

export function main() {
  return performOperation(79, "new = old * 19");
}
