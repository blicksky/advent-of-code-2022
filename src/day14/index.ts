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

type TileKey = `d${number}c${number}`;

type Cave = {
  rockTiles: Set<TileKey>;
  sandTiles: Set<TileKey>;
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

  const rockTiles = new Set<TileKey>();
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
          rockTiles.add(getTileKey({ depth: point.depth, column: c }));
        }
      } else if (point.column === nextPoint.column) {
        const minDepth = Math.min(point.depth, nextPoint.depth);
        const maxDepth = Math.max(point.depth, nextPoint.depth);

        for (let d = minDepth; d <= maxDepth; ++d) {
          rockTiles.add(getTileKey({ depth: d, column: point.column }));
        }
      }
    }
  });

  return {
    rockTiles,
    sandTiles: new Set(),
    maxDepth,
  };
}

function printCave(cave: Cave): void {
  const rows: string[] = [];
  for (let depth = 0; depth < cave.maxDepth + 4; depth += 1) {
    let row = "";
    for (let column = 410; column < 520; column += 1) {
      row +=
        cave.rockTiles.has(getTileKey({ depth, column })) ||
        depth === cave.maxDepth + 2
          ? "#"
          : cave.sandTiles.has(getTileKey({ depth, column }))
          ? "o"
          : ".";
    }
    rows.push(row);
  }
  console.log(rows.join("\n"));
}

const potentialColumnShifts = [0, -1, 1] as const;

export function simulateSand(cave: Cave): number {
  let stoppedSandUnitCount = 0;

  newSand: while (true) {
    let sandTile: Tile = { depth: 0, column: 500 };

    sandFall: while (true) {
      const didSandMove = potentialColumnShifts.some((potentialColumnShift) => {
        const fallTile: Tile = {
          depth: sandTile.depth + 1,
          column: sandTile.column + potentialColumnShift,
        };

        const fallTileKey = getTileKey(fallTile);
        if (
          !cave.rockTiles.has(fallTileKey) &&
          !cave.sandTiles.has(fallTileKey)
        ) {
          sandTile = fallTile;
          return true;
        } else {
          return false;
        }
      });

      if (!didSandMove) {
        cave.sandTiles.add(getTileKey(sandTile));
        stoppedSandUnitCount += 1;
        break sandFall;
      }

      if (sandTile.depth >= cave.maxDepth) {
        break newSand;
      }
    }
  }

  return stoppedSandUnitCount;
}

export function simulateSandWithFloor(cave: Cave): number {
  let stoppedSandUnitCount = 0;

  newSand: while (true) {
    let sandTile: Tile = { depth: 0, column: 500 };

    sandFall: while (true) {
      const didSandMove = potentialColumnShifts.some((potentialColumnShift) => {
        const fallTile: Tile = {
          depth: sandTile.depth + 1,
          column: sandTile.column + potentialColumnShift,
        };

        const fallTileKey = getTileKey(fallTile);
        if (
          cave.rockTiles.has(fallTileKey) ||
          cave.sandTiles.has(fallTileKey) ||
          fallTile.depth >= cave.maxDepth + 2
        ) {
          return false;
        } else {
          sandTile = fallTile;
          return true;
        }
      });

      if (!didSandMove) {
        cave.sandTiles.add(getTileKey(sandTile));
        stoppedSandUnitCount += 1;

        if (sandTile.depth === 0) {
          console.log("breaking newSand");
          break newSand;
        }

        break sandFall;
      }
    }
  }

  return stoppedSandUnitCount;
}
