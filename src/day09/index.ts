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

export function countTailPositions(motions: Motion[]): number {
  const visitedTailPositions = new Set<PositionKey>();

  const headPosition: Position = { row: 0, column: 0 };
  const tailPosition: Position = { row: 0, column: 0 };

  motions.forEach(({ direction, distance }) => {
    for (let step = 0; step < distance; ++step) {
      if (direction === Direction.Up) {
        headPosition.row += 1;
      } else if (direction === Direction.Down) {
        headPosition.row -= 1;
      } else if (direction === Direction.Right) {
        headPosition.column += 1;
      } else if (direction === Direction.Left) {
        headPosition.column -= 1;
      }

      const rowDifference = headPosition.row - tailPosition.row;
      const columnDifference = headPosition.column - tailPosition.column;

      if (Math.abs(rowDifference) > 1 && columnDifference === 0) {
        tailPosition.row += Math.sign(rowDifference);
        // console.log("vertical", {
        //   direction,
        //   distance,
        //   rowDiff: Math.sign(rowDifference),
        //   colDiff: Math.sign(columnDifference),
        // });
      } else if (Math.abs(columnDifference) > 1 && rowDifference === 0) {
        tailPosition.column += Math.sign(columnDifference);
        // console.log("horizontal", {
        //   direction,
        //   distance,
        //   rowDiff: Math.sign(rowDifference),
        //   colDiff: Math.sign(columnDifference),
        // });
      } else if (Math.abs(columnDifference) + Math.abs(rowDifference) > 2) {
        tailPosition.row += Math.sign(rowDifference);
        tailPosition.column += Math.sign(columnDifference);
        // console.log("diagonal", {
        //   direction,
        //   distance,
        //   rowDiff: Math.sign(rowDifference),
        //   colDiff: Math.sign(columnDifference),
        // });
      }

      visitedTailPositions.add(`${tailPosition.row}-${tailPosition.column}`);
    }
  });

  //   console.log({
  //     headPosition,
  //     tailPosition,
  //     visitedTailPositions,
  //     size: visitedTailPositions.size,
  //   });

  return visitedTailPositions.size;
}
