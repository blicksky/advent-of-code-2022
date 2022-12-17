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

type Coord = [number, number];
type RockShape = Readonly<Array<Readonly<Coord>>>;

export const RockShape: Readonly<
  Record<string, Readonly<Array<Readonly<Coord>>>>
> = {
  HorizontalLine: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ],
  Plus: [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
    [3, 1],
  ],
  Hook: [
    [0, 2],
    [1, 2],
    [3, 0],
    [3, 1],
    [3, 2],
  ],
  VerticalLine: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
  Square: [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ],
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

export function main() {}
