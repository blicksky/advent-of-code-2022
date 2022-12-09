export function parseTreeHeightGrid(input: string): number[][] {
  return input
    .split("\n")
    .map((row) => row.split("").map((treeHeight) => parseInt(treeHeight, 10)));
}

export function countVisibleTrees(grid: number[][]): number {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;

  const visibleTrees = new Set();

  for (let r = 0; r < gridHeight; ++r) {
    // from the left
    let max = -1;
    for (let c = 0; c < gridWidth; ++c) {
      const treeHeight = grid[r][c];
      if (treeHeight > max) {
        visibleTrees.add(`${r}-${c}`);
        max = treeHeight;
      }
    }

    // from the right
    max = -1;
    for (let c = gridWidth - 1; c >= 0; --c) {
      const treeHeight = grid[r][c];
      if (treeHeight > max) {
        visibleTrees.add(`${r}-${c}`);
        max = treeHeight;
      }
    }
  }

  for (let c = 0; c < gridWidth; ++c) {
    // from the top
    let max = -1;
    for (let r = 0; r < gridHeight; ++r) {
      const treeHeight = grid[r][c];
      if (treeHeight > max) {
        visibleTrees.add(`${r}-${c}`);
        max = treeHeight;
      }
    }

    // from the bottom
    max = -1;
    for (let r = gridHeight - 1; r >= 0; --r) {
      const treeHeight = grid[r][c];
      if (treeHeight > max) {
        visibleTrees.add(`${r}-${c}`);
        max = treeHeight;
      }
    }
  }

  return visibleTrees.size;
}
