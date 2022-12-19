type Cube = [number, number, number];
type CubeKey = `${number},${number},${number}`;

const toCubeKey = (cube: Cube): CubeKey => {
  const [x, y, z] = cube;
  return `${x},${y},${z}`;
};

const fromCubeKey = (cubeKey: CubeKey): Cube => {
  return cubeKey.split(",").map((value) => parseInt(value)) as Cube;
};

export function parseCubes(input: string): Cube[] {
  return (input.split("\n") as CubeKey[]).map(fromCubeKey);
}

type MapData = {
  max: number;
  min: number;
  positions: Set<number>;
};

type SideMap = Map<number, Map<number, MapData>>;

function updateSideMap(
  sideMap: SideMap,
  sideDim1: number,
  sideDim2: number,
  posDim: number
) {
  if (!sideMap.has(sideDim1)) {
    sideMap.set(sideDim1, new Map());
  }
  const dim1 = sideMap.get(sideDim1)!;

  if (!dim1.has(sideDim2)) {
    dim1.set(sideDim2, {
      min: Infinity,
      max: -Infinity,
      positions: new Set(),
    });
  }
  const dim2 = dim1.get(sideDim2)!;

  dim2.min = Math.min(dim2.min, posDim);
  dim2.max = Math.max(dim2.max, posDim);
  dim2.positions.add(posDim);
}

export function main(cubes: Cube[]) {
  const cubeKeys = new Set<CubeKey>();
  let surfaceArea = 0;

  let xySideMap: SideMap = new Map();
  let xzSideMap: SideMap = new Map();
  let yzSideMap: SideMap = new Map();

  for (let i = 0; i < cubes.length; i += 1) {
    const [x, y, z] = cubes[i];

    const potentialAdjacentCubes = [
      [x - 1, y, z],
      [x + 1, y, z],
      [x, y - 1, z],
      [x, y + 1, z],
      [x, y, z - 1],
      [x, y, z + 1],
    ] as Cube[];

    const adjacentCubeCount = potentialAdjacentCubes.filter((adjacentCube) =>
      cubeKeys.has(toCubeKey(adjacentCube))
    ).length;

    surfaceArea += 6 - adjacentCubeCount * 2;
    cubeKeys.add(toCubeKey([x, y, z]));

    updateSideMap(xySideMap, x, y, z);
    updateSideMap(xzSideMap, x, z, y);
    updateSideMap(yzSideMap, y, z, x);
  }

  const zHoles = new Set<CubeKey>();
  for (const [x, yDim] of xySideMap.entries()) {
    for (const [y, { min, max, positions }] of yDim) {
      for (let z = min + 1; z < max; z += 1) {
        if (!positions.has(z)) {
          zHoles.add(toCubeKey([x, y, z]));
        }
      }
    }
  }
  console.log("z holes", zHoles);

  const yHoles = new Set<CubeKey>();
  for (const [x, zDim] of xzSideMap.entries()) {
    for (const [z, { min, max, positions }] of zDim) {
      for (let y = min + 1; y < max; y += 1) {
        if (!positions.has(y)) {
          yHoles.add(toCubeKey([x, y, z]));
        }
      }
    }
  }
  console.log("y holes", yHoles);

  const xHoles = new Set<CubeKey>();
  for (const [y, zDim] of yzSideMap.entries()) {
    for (const [z, { min, max, positions }] of zDim) {
      for (let x = min + 1; x < max; x += 1) {
        if (!positions.has(x)) {
          xHoles.add(toCubeKey([x, y, z]));
        }
      }
    }
  }
  console.log("x holes", xHoles);

  const xyzHoles = new Set<CubeKey>();
  xHoles.forEach((cubeKey) => {
    if (yHoles.has(cubeKey) && zHoles.has(cubeKey)) {
      xyzHoles.add(cubeKey);
    }
  });
  console.log("xyz holes", xyzHoles);

  // TODO subtract the surface area in the holes,
  // or maybe run the first part again, checking
  // against the set of holes?

  return surfaceArea;
}
