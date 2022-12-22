type Name = string;
const enum Operation {
  Add = "+",
  Subtract = "-",
  Multiply = "*",
  Divide = "/",
}

type ValueJob = { name: Name; value: number };
type MathJob = {
  name: Name;
  leftOperand: Name;
  rightOperand: Name;
  operation: Operation;
};
type MonkeyJob = ValueJob | MathJob;

const isValueJob = (job: MonkeyJob): job is ValueJob => "value" in job;

export function parseInput(input: string): Array<MonkeyJob> {
  const lines = input.split("\n");

  return lines.map((line) => {
    const [name, expression] = line.split(": ");
    const [valueOrLeftOperand, operation, rightOperand] = expression.split(" ");

    const maybeNumber = parseInt(valueOrLeftOperand, 10);

    if (!isNaN(maybeNumber)) {
      return {
        name,
        value: maybeNumber,
      };
    } else {
      return {
        name,
        leftOperand: valueOrLeftOperand,
        operation: operation as Operation,
        rightOperand,
      };
    }
  });
}

export async function main(jobs: MonkeyJob[]) {
  const jobPromises = new Map<Name, () => Promise<number>>();

  jobs.forEach((job) => {
    if (isValueJob(job)) {
      jobPromises.set(job.name, async () => job.value);
    } else {
      jobPromises.set(job.name, async () => {
        const [leftValue, rightValue] = await Promise.all([
          jobPromises.get(job.leftOperand)!(),
          jobPromises.get(job.rightOperand)!(),
        ]);

        switch (job.operation) {
          case Operation.Add:
            return leftValue + rightValue;
          case Operation.Subtract:
            return leftValue - rightValue;
          case Operation.Multiply:
            return leftValue * rightValue;
          case Operation.Divide:
            return leftValue / rightValue;
        }
      });
    }
  });

  return await jobPromises.get("root")!();
}

// Idea for 2: don't do the math, but build an equation as a string with `humn` as the variable
// TODO make this actually solve the equation it comes up with...
export async function main2(jobs: MonkeyJob[]) {
  const jobPromises = new Map<Name, () => Promise<string>>();

  jobs.forEach((job) => {
    if (isValueJob(job)) {
      if (job.name === "humn") {
        jobPromises.set(job.name, async () => "X");
      } else {
        jobPromises.set(job.name, async () => `${job.value}`);
      }
    } else {
      jobPromises.set(job.name, async () => {
        const [leftValue, rightValue] = await Promise.all([
          jobPromises.get(job.leftOperand)!(),
          jobPromises.get(job.rightOperand)!(),
        ]);

        if (job.name === "root") {
          return `${leftValue} = ${rightValue}`;
        } else {
          const maybeLeftNumber = Number(leftValue);
          const maybeRightNumber = Number(rightValue);

          if (isNaN(maybeLeftNumber) || isNaN(maybeRightNumber)) {
            switch (job.operation) {
              case Operation.Add:
                return `(${leftValue} + ${rightValue})`;
              case Operation.Subtract:
                return `(${leftValue} - ${rightValue})`;
              case Operation.Multiply:
                return `(${leftValue} * ${rightValue})`;
              case Operation.Divide:
                return `(${leftValue} / ${rightValue})`;
            }
          } else {
            switch (job.operation) {
              case Operation.Add:
                return `${maybeLeftNumber + maybeRightNumber}`;
              case Operation.Subtract:
                return `${maybeLeftNumber - maybeRightNumber}`;
              case Operation.Multiply:
                return `${maybeLeftNumber * maybeRightNumber}`;
              case Operation.Divide:
                return `${maybeLeftNumber / maybeRightNumber}`;
            }
          }
        }
      });
    }
  });

  return await jobPromises.get("root")!();
}
