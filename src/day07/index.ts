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
        const size = parseInt(line, 10);
        return dirSize + (isNaN(size) ? 0 : size);
      }, 0);

      for (let i = 0; i <= dirStack.length; ++i) {
        const path = `/${dirStack.slice(0, i).join("/")}`;
        const previousSize = sizesByDir.get(path) ?? 0;
        sizesByDir.set(path, previousSize + dirSize);
      }
    }
  });

  const sizes = [...sizesByDir.values()];

  const sumOfSmallSizes = sizes.reduce(
    (sum, dir) => (dir < 100000 ? sum + dir : sum),
    0
  );

  const usedSpace = sizesByDir.get("/") ?? 0;
  const unusedSpace = 70000000 - usedSpace;
  const sizeToDelete = sizes
    .filter((size) => unusedSpace + size >= 30000000)
    .sort((a, b) => a - b)[0];

  return { sumOfSmallSizes, sizeToDelete };
}
