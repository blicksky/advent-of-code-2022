/*
parse:
- split on " -> ", then each on ","
- create a set of coord keys
- for each pair:
  - TODO keep track of max row, and maybe max and min col
  - compare to next if there is one
  - if row is the same
    - iterate from min(col) to max(col)
      - add coord key to set
  - if col is the same
    - iterate from min(row) to max(row)
      - add coord key to set
      
solve:
- count sand being added
- move sand while there's a space for it to go
    that's not in the set.
    - if the sand is at the lowest row, we're done
- if it can't move anymore, add that space to the set
*/

type Tile = {
  depth: number;
  column: number;
};

type RockPath = Tile[];

type TileKey = `d${number}c${number}`;

type Cave = {
  blockedTiles: Set<TileKey>;
  maxDepth: number;
};

const getTileKey = (tile: Tile): TileKey => {
  return `d${tile.depth}c${tile.column}`;
};

export function parseCave(input: string): Cave {
  const rockPaths = input.split("\n").map((line) =>
    line.split(" -> ").map((coord) => {
      const [column, depth] = coord
        .split(",")
        .map((value) => parseInt(value, 10));
      return { column, depth } as Tile;
    })
  );

  const blockedTiles = new Set<TileKey>();
  let maxDepth = 0;

  rockPaths.forEach((rockPath) => {
    for (let i = 0; i < rockPath.length - 1; ++i) {
      const point = rockPath[i];
      const nextPoint = rockPath[i + 1];
      maxDepth = Math.max(maxDepth, point.depth, nextPoint.depth);

      if (point.depth === nextPoint.depth) {
        const minColumn = Math.min(point.column, nextPoint.column);
        const maxColumn = Math.max(point.column, nextPoint.column);

        for (let c = minColumn; c <= maxColumn; ++c) {
          blockedTiles.add(getTileKey({ depth: point.depth, column: c }));
        }
      } else if (point.column === nextPoint.column) {
        const minDepth = Math.min(point.depth, nextPoint.depth);
        const maxDepth = Math.max(point.depth, nextPoint.depth);

        for (let d = minDepth; d <= maxDepth; ++d) {
          blockedTiles.add(getTileKey({ depth: d, column: point.column }));
        }
      }
    }
  });

  return {
    blockedTiles,
    maxDepth,
  };
}

export function main() {}
