export function findSmallFiles(input: string): {
  sumOfSmallSizes: number;
  sizeToDelete: number;
} {
  const commands = input.split("$ ").map((item) => {
    const [command, ...output] = item.split("\n");
    return { command, output };
  });

  const sizesByDir = new Map<string, number>();
  const dirStack: Array<string> = [];

  commands.forEach(({ command, output }) => {
    const currentDir = `/${dirStack.join("/")}`;

    if (command) {
      if (command === "cd /") {
        dirStack.length = 0;
      } else if (command.startsWith("cd")) {
        const [, dir] = command.split(" ");

        if (dir === "..") {
          dirStack.pop();
        } else {
          dirStack.push(dir);
        }
      } else if (command === "ls") {
        const dirSize = output.reduce((dirSize, line) => {
          const size = parseInt(line, 10) ?? 0;
          return dirSize + (isNaN(size) ? 0 : size);
        }, 0);

        if (!sizesByDir.has(currentDir)) {
          sizesByDir.set(currentDir, 0);
        }

        sizesByDir.set(currentDir, sizesByDir.get(currentDir)! + dirSize);

        const dirStackCopy = [...dirStack];
        while (dirStackCopy.length > 0) {
          dirStackCopy.pop();
          const curr = `/${dirStackCopy.join("/")}`;

          sizesByDir.set(curr, sizesByDir.get(curr)! + dirSize);
        }
      }
    }
  });

  const sizes = [...sizesByDir.values()];

  const sumOfSmallSizes = sizes.reduce(
    (sum, dir) => (dir < 100000 ? sum + dir : sum),
    0
  );

  const unusedSpace = 70000000 - sizesByDir.get("/")!;
  const sizeToDelete = sizes
    .filter((size) => unusedSpace + size >= 30000000)
    .sort((a, b) => a - b)[0];

  return { sumOfSmallSizes, sizeToDelete };
}
