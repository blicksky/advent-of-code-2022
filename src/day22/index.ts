const enum Facing {
  Right = ">",
  Down = "v",
  Left = "<",
  Up = "^",
}

type Position = {
  row: number;
  column: number;
};

type PositionKey = `${number}-${number}`;

const toPositionKey = ({ row, column }: Position): PositionKey => {
  return `${row}-${column}`;
};

const fromPositionKey = (key: PositionKey): Position => {
  const [row, column] = key.split("-").map((n) => parseInt(n, 10));
  return { row, column };
};

export const enum Turn {
  Clockwise = "R",
  CounterClockwise = "L",
}

type Path = Array<Turn | number>;

const enum Marker {
  OpenTile = ".",
  SolidWall = "#",
}

type TileMap = Map<PositionKey, Marker>;
type Bounds = { max: number; min: number };

const getOrDefault = <Key, Value>(
  map: Map<Key, Value>,
  key: Key,
  defaultValue: Value
): Value => {
  if (!map.has(key)) {
    map.set(key, defaultValue);
  }
  return map.get(key)!;
};

type Board = {
  tileMap: TileMap;
  boundsByRow: Map<number, Bounds>;
  boundsByColumn: Map<number, Bounds>;
};

function parseMapInput(mapInput: string): Board {
  const rows = mapInput
    .split("\n")
    .filter((line) => line.trim() != "")
    .map((row) => [...row]);

  const tileMap = new Map<PositionKey, Marker>();
  const boundsByRow = new Map<number, Bounds>();
  const boundsByColumn = new Map<number, Bounds>();

  for (let r = 1; r <= rows.length; r += 1) {
    const row = rows[r - 1];
    for (let c = 1; c <= row.length; c += 1) {
      const tile = row[c - 1];

      if (tile === Marker.OpenTile || tile === Marker.SolidWall) {
        tileMap.set(toPositionKey({ row: r, column: c }), tile);

        const rowBounds = getOrDefault(boundsByRow, r, {
          min: Infinity,
          max: -Infinity,
        });
        rowBounds.max = Math.max(rowBounds.max, c);
        rowBounds.min = Math.min(rowBounds.min, c);

        const columnBounds = getOrDefault(boundsByColumn, c, {
          min: Infinity,
          max: -Infinity,
        });
        columnBounds.max = Math.max(columnBounds.max, r);
        columnBounds.min = Math.min(columnBounds.min, r);
      }
    }
  }

  return { tileMap, boundsByRow, boundsByColumn };
}

function parsePathInput(input: string): Path {
  return input
    .split(/(L|R)/)
    .filter(Boolean)
    .map((item) => {
      const maybeSteps = parseInt(item, 10);
      return isNaN(maybeSteps) ? (item as Turn) : maybeSteps;
    });
}

export function parseInput(input: string): [Board, Path] {
  const [mapInput, pathInput] = input.split("\n\n");

  const board = parseMapInput(mapInput);
  const path = parsePathInput(pathInput);

  return [board, path];
}

export function main() {}
