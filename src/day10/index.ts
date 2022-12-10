const { exampleInput, longerExampleInput, puzzleInput } = require("./input.ts");

const instructions = puzzleInput.split("\n");

let registerX = 1;
let clock = 0;
let signalStrengthSum = 0;

const tick = () => {
  clock += 1;

  if ((clock + 20) % 40 === 0) {
    const signalStrength = clock * registerX;
    console.log({ clock, registerX, signalStrength });
    signalStrengthSum += signalStrength;
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
