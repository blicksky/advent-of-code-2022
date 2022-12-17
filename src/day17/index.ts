type GasJetLeft = "<";
type GasJetRight = ">";
type GasJetDirection = GasJetLeft | GasJetRight;

export function* getGasJetSequence(pattern: string): Iterator<GasJetDirection> {
  for (let i = 0; true; i = (i + 1) % pattern.length) {
    yield pattern[i] as GasJetDirection;
  }
}

type RockShapeName =
  | "HorizontalLine"
  | "Plus"
  | "Hook"
  | "VerticalLine"
  | "Square";

type Coord = [number, number];
type RockShape = Readonly<Array<Readonly<Coord>>>;

export const RockShape: Readonly<Record<RockShapeName, RockShape>> = {
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

export function* getRockSequence(): Iterator<RockShape> {
  while (true) {
    yield RockShape.HorizontalLine;
    yield RockShape.Plus;
    yield RockShape.Hook;
    yield RockShape.VerticalLine;
    yield RockShape.Square;
  }
}

export function main() {}
