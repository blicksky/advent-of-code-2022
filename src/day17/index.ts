export const GasJet = {
  Left: "<",
  Right: ">",
} as const;

type GasJetDirectionName = keyof typeof GasJet;
type GasJetDirection = typeof GasJet[GasJetDirectionName];

export function* getGasJetSequence(
  pattern: string
): Iterator<GasJetDirection, never, never> {
  for (let i = 0; true; i = (i + 1) % pattern.length) {
    yield pattern[i] as GasJetDirection;
  }
}

type Point = {
  readonly fromBottom: number;
  readonly fromLeft: number;
};

type RockShape = Readonly<{
  readonly height: number;
  readonly width: number;
  readonly pointOffsets: Readonly<Point[]>;
}>;

export const RockShape: Record<string, RockShape> = {
  HorizontalLine: {
    height: 1,
    width: 4,
    pointOffsets: [
      { fromBottom: 0, fromLeft: 0 },
      { fromBottom: 0, fromLeft: 1 },
      { fromBottom: 0, fromLeft: 2 },
      { fromBottom: 0, fromLeft: 3 },
    ],
  },
  Plus: {
    height: 3,
    width: 3,
    pointOffsets: [
      { fromBottom: 0, fromLeft: 1 },
      { fromBottom: 1, fromLeft: 0 },
      { fromBottom: 1, fromLeft: 1 },
      { fromBottom: 1, fromLeft: 2 },
      { fromBottom: 2, fromLeft: 1 },
    ],
  },
  Hook: {
    height: 3,
    width: 3,
    pointOffsets: [
      { fromBottom: 0, fromLeft: 0 },
      { fromBottom: 0, fromLeft: 1 },
      { fromBottom: 0, fromLeft: 2 },
      { fromBottom: 1, fromLeft: 2 },
      { fromBottom: 2, fromLeft: 2 },
    ],
  },
  VerticalLine: {
    height: 4,
    width: 1,
    pointOffsets: [
      { fromBottom: 0, fromLeft: 0 },
      { fromBottom: 1, fromLeft: 0 },
      { fromBottom: 2, fromLeft: 0 },
      { fromBottom: 3, fromLeft: 0 },
    ],
  },
  Square: {
    height: 2,
    width: 2,
    pointOffsets: [
      { fromBottom: 0, fromLeft: 0 },
      { fromBottom: 0, fromLeft: 1 },
      { fromBottom: 1, fromLeft: 0 },
      { fromBottom: 1, fromLeft: 1 },
    ],
  },
} as const;

export function* getRockSequence(): Iterator<RockShape, never, never> {
  while (true) {
    yield RockShape.HorizontalLine;
    yield RockShape.Plus;
    yield RockShape.Hook;
    yield RockShape.VerticalLine;
    yield RockShape.Square;
  }
}

class PointSet {
  private static pointKeySeparator = ",";

  readonly #set = new Set<string>();
  #highestPoint = -1;

  #buildPointKey(point: Point) {
    return [point.fromBottom, PointSet.pointKeySeparator, point.fromLeft].join(
      ""
    );
  }

  get highestPoint() {
    return this.#highestPoint;
  }

  add(point: Point) {
    this.#highestPoint = Math.max(this.highestPoint, point.fromBottom);
    return this.#set.add(this.#buildPointKey(point));
  }

  has(point: Point) {
    return this.#set.has(this.#buildPointKey(point));
  }

  values(): Readonly<Point[]> {
    return [...this.#set.values()].map((value) => {
      const parts = value.split(PointSet.pointKeySeparator);
      const [height, left] = parts.map((part) => parseInt(part, 10));
      return { fromBottom: height, fromLeft: left };
    });
  }

  replaceAll(points: Iterable<Point>) {
    this.#set.clear();
    for (const point of points) {
      this.#set.add(this.#buildPointKey(point));
    }
  }
}

const CHAMBER_WIDTH = 7;

function printChamber({
  stoppedRockPoints,
  fallingRockPoints,
}: {
  stoppedRockPoints: PointSet;
  fallingRockPoints: PointSet;
}) {
  const rows = [];
  for (
    let h = Math.max(
      fallingRockPoints.highestPoint,
      stoppedRockPoints.highestPoint
    );
    h >= 0;
    h -= 1
  ) {
    const row = [];
    for (let c = 0; c < CHAMBER_WIDTH; c += 1) {
      const point: Point = { fromBottom: h, fromLeft: c };

      if (fallingRockPoints.has(point)) {
        row.push("@");
      } else if (stoppedRockPoints.has(point)) {
        row.push("#");
      } else {
        row.push(".");
      }
    }
    rows.push(row);
  }

  console.log(
    rows
      .map((row) => `|${row.join("")}|`)
      .concat(`+${"-".repeat(CHAMBER_WIDTH)}+`)
      .join("\n")
  );
}

export function main(gasJetPattern: string, dropLimit: number): number {
  const fallingRockPoints = new PointSet();
  const stoppedRockPoints = new PointSet();
  const rockSequence = getRockSequence();
  const gasJetSequence = getGasJetSequence(gasJetPattern);

  for (let drop = 0; drop < dropLimit; drop += 1) {
    const rock: RockShape = rockSequence.next().value;
    const appearancePoint: Point = {
      fromBottom: stoppedRockPoints.highestPoint + 4,
      fromLeft: 2,
    } as const;

    rock.pointOffsets.forEach((pointOffset: Point) => {
      fallingRockPoints.add({
        fromBottom: appearancePoint.fromBottom + pointOffset.fromBottom,
        fromLeft: appearancePoint.fromLeft + pointOffset.fromLeft,
      });
    });

    let didMoveDown = true;
    while (didMoveDown) {
      const gasJetDirection = gasJetSequence.next().value;
      const gasJetLeftOffset = gasJetDirection === GasJet.Left ? -1 : 1;

      const pushedFallingRockPoints: Point[] = fallingRockPoints
        .values()
        .map((point) => {
          return {
            fromBottom: point.fromBottom,
            fromLeft: point.fromLeft + gasJetLeftOffset,
          };
        });

      const isRockFreeToBePushed = pushedFallingRockPoints.every((point) => {
        return (
          point.fromLeft >= 0 &&
          point.fromLeft < CHAMBER_WIDTH &&
          !stoppedRockPoints.has(point)
        );
      });

      if (isRockFreeToBePushed) {
        fallingRockPoints.replaceAll(pushedFallingRockPoints);
      }

      const droppedFallingRockPoints: Point[] = fallingRockPoints
        .values()
        .map((point) => {
          return {
            fromBottom: point.fromBottom - 1,
            fromLeft: point.fromLeft,
          };
        });

      const isRockFreeToDrop = droppedFallingRockPoints.every((point) => {
        return point.fromBottom >= 0 && !stoppedRockPoints.has(point);
      });

      if (isRockFreeToDrop) {
        fallingRockPoints.replaceAll(droppedFallingRockPoints);
      } else {
        fallingRockPoints
          .values()
          .forEach((point) => stoppedRockPoints.add(point));
        fallingRockPoints.replaceAll([]);
        didMoveDown = false;
      }
    }
  }

  return stoppedRockPoints.highestPoint + 1;
}
