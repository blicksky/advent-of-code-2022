export enum Direction {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R",
}

type Motion = {
  direction: Direction;
  distance: number;
};

type MotionInput = `${Direction} ${number}`;

export function parseMotions(motionsInput: string): Motion[] {
  const motionInputs = motionsInput.split("\n") as MotionInput[];

  return motionInputs.map((motionInput) => {
    const [direction, distance] = motionInput.split(" ");
    return {
      direction: direction as Direction,
      distance: parseInt(distance, 10),
    };
  });
}
