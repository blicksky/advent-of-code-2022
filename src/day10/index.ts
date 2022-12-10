const { exampleInput, longerExampleInput, puzzleInput } = require("./input.ts");

const instructions = puzzleInput.split("\n");

let registerX = 1;
let clock = 0;
let signalStrengthSum = 0;
let pixel = 0;
let screen = "";

const tick = () => {
  clock += 1;

  if (
    pixel + 1 === registerX ||
    pixel === registerX ||
    pixel - 1 === registerX
  ) {
    screen += "#";
  } else {
    screen += ".";
  }

  console.log(pixel, registerX);
  console.log(screen);

  if ((clock + 20) % 40 === 0) {
    const signalStrength = clock * registerX;
    console.log({ clock, registerX, signalStrength });
    signalStrengthSum += signalStrength;
  }

  pixel += 1;

  if (pixel === 40) {
    screen += "\n";
    pixel = 0;
  }
};

instructions.forEach((instruction) => {
  const [type, arg] = instruction.split(" ");

  switch (type) {
    case "noop":
      tick();
      break;

    case "addx":
      const amount = parseInt(arg, 10);
      tick();
      tick();
      registerX += amount;
      break;
  }
});

console.log(signalStrengthSum);
