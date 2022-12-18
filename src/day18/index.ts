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

export function main(cubes: Cube[]) {
  const cubeKeys = new Set<CubeKey>();
  let surfaceArea = 0;

  for (let i = 0; i < cubes.length; i += 1) {
    const cube = cubes[i];

    const adjacentCubeCount = [
      [cube[0] - 1, cube[1], cube[2]] as Cube,
      [cube[0] + 1, cube[1], cube[2]] as Cube,
      [cube[0], cube[1] - 1, cube[2]] as Cube,
      [cube[0], cube[1] + 1, cube[2]] as Cube,
      [cube[0], cube[1], cube[2] - 1] as Cube,
      [cube[0], cube[1], cube[2] + 1] as Cube,
    ].filter((adjacentCube) => cubeKeys.has(toCubeKey(adjacentCube))).length;

    surfaceArea += 6 - adjacentCubeCount * 2;
    cubeKeys.add(toCubeKey(cube));
  }

  return surfaceArea;
}
