export enum InstructionType {
  Noop = "noop",
  AddX = "addx",
}

type NoopInstruction = { type: InstructionType.Noop };
type AddxInstruction = { type: InstructionType.AddX; amount: number };
export type Instruction = NoopInstruction | AddxInstruction;

type NoopInstructionInput = InstructionType.Noop;
type AddXInstructionInput = `${InstructionType.AddX} ${number}`;
type InstructionInput = NoopInstructionInput | AddXInstructionInput;

function parseInstruction(input: InstructionInput): Instruction {
  const [type, amount] = input.split(" ") as [InstructionType, string];

  switch (type) {
    case InstructionType.Noop:
      return { type: InstructionType.Noop };
    case InstructionType.AddX:
      return {
        type: InstructionType.AddX,
        amount: parseInt(amount, 10),
      };
  }
}

export function parseInput(input: string): Instruction[] {
  return input
    .split("\n")
    .map((line) => parseInstruction(line as InstructionInput));
}

const SCREEN_WIDTH = 40;

export function executeInstructions(instructions: Instruction[]): {
  signalStrengthSum: number;
  screen: string[];
} {
  let registerX = 1;
  let clock = 0;
  let signalStrengthSum = 0;

  const isSignalStrengthInteresting = (): boolean => {
    return (clock + 20) % 40 === 0;
  };

  const getSignalStrength = (): number => clock * registerX;

  let pixel = 0;
  let screen = "";

  const startNewLine = (): void => {
    screen += "\n";
    pixel = 0;
  };

  const isPixelLit = (): boolean => {
    return (
      pixel + 1 === registerX || pixel === registerX || pixel - 1 === registerX
    );
  };

  const tick = () => {
    clock += 1;

    screen += isPixelLit() ? "#" : ".";

    if (isSignalStrengthInteresting()) {
      signalStrengthSum += getSignalStrength();
    }

    pixel += 1;

    if (pixel === SCREEN_WIDTH) {
      startNewLine();
    }
  };

  instructions.forEach((instruction) => {
    tick();

    if (instruction.type === InstructionType.AddX) {
      tick();
      registerX += instruction.amount;
    }
  });

  return {
    signalStrengthSum,
    screen: screen.trim().split("\n"),
  };
}
