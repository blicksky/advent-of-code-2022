type Monkey = {
  items: number[];
  expression: string;
  testDivisor: number;
  testPassedTargetMonkey: number;
  testFailedTargetMonkey: number;
  inspectionCount: number;
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
      inspectionCount: 0,
    };
  });
}

export function runRound(monkeys: Monkey[]): void {
  const log: string[] = [];
  monkeys.forEach((monkey, i) => {
    log.push(`Monkey ${i}:`);
    while (monkey.items.length > 0) {
      let item = monkey.items.shift();
      log.push(`  Monkey inspects an item with a worry level of ${item}.`);
      monkey.inspectionCount += 1;

      const old = item; // "old" referenced in expression
      item = eval(monkey.expression) as number;
      log.push(`    Worry level is (${monkey.expression}) to ${item}`);

      item = Math.floor(item / 3);
      log.push(
        `    Monkey gets bored with item. Worry level is divided by 3 to ${item}.`
      );

      if (item % monkey.testDivisor === 0) {
        log.push(
          `    Current worry level is divisible by ${monkey.testDivisor}.`
        );
        log.push(
          `    Item with worry level ${item} is thrown to monkey ${monkey.testPassedTargetMonkey}.`
        );
        monkeys[monkey.testPassedTargetMonkey].items.push(item);
      } else {
        log.push(
          `    Current worry level is not divisible by ${monkey.testDivisor}.`
        );
        log.push(
          `    Item with worry level ${item} is thrown to monkey ${monkey.testFailedTargetMonkey}.`
        );
        monkeys[monkey.testFailedTargetMonkey].items.push(item);
      }
    }
  });
  //   console.log(log.join("\n"));
}

export function calculateMonkeyBusinessLevel(monkeys: Monkey[]): number {
  const [mostActiveMonkey, secondMostActiveMonkey] = monkeys.sort(
    (monkeyA, monkeyB) => monkeyB.inspectionCount - monkeyA.inspectionCount
  );

  return (
    mostActiveMonkey.inspectionCount * secondMostActiveMonkey.inspectionCount
  );
}
