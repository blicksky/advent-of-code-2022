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

type Position = { row: number; column: number };
type PositionKey = `${number}-${number}`;

export function countTailPositions(
  motions: Motion[],
  ropeLength: number
): number {
  const visitedTailPositions = new Set<PositionKey>();

  const moveHeadKnot = (direction: Direction): void => {
    const headKnot = knots[0];

    if (direction === Direction.Up) {
      headKnot.row += 1;
    } else if (direction === Direction.Down) {
      headKnot.row -= 1;
    } else if (direction === Direction.Right) {
      headKnot.column += 1;
    } else if (direction === Direction.Left) {
      headKnot.column -= 1;
    }
  };

  const moveKnot = (knotIndex: number): void => {
    const movingKnot = knots[knotIndex];
    const pullingKnot = knots[knotIndex - 1];

    const rowDifference = pullingKnot.row - movingKnot.row;
    const columnDifference = pullingKnot.column - movingKnot.column;

    if (Math.abs(rowDifference) > 1 && columnDifference === 0) {
      movingKnot.row += Math.sign(rowDifference);
    } else if (Math.abs(columnDifference) > 1 && rowDifference === 0) {
      movingKnot.column += Math.sign(columnDifference);
    } else if (Math.abs(columnDifference) + Math.abs(rowDifference) > 2) {
      movingKnot.row += Math.sign(rowDifference);
      movingKnot.column += Math.sign(columnDifference);
    }
  };

  const knots = Array.from(
    { length: ropeLength },
    () => ({ row: 0, column: 0 } as Position)
  );

  motions.forEach(({ direction, distance }) => {
    for (let step = 0; step < distance; ++step) {
      moveHeadKnot(direction);

      for (let knotIndex = 1; knotIndex < knots.length; ++knotIndex) {
        moveKnot(knotIndex);
      }

      const tailKnot = knots[knots.length - 1];
      visitedTailPositions.add(`${tailKnot.row}-${tailKnot.column}`);
    }
  });

  return visitedTailPositions.size;
}
