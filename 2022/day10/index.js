const fs = require("fs");

const program = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(" "));

const partOne = () => {
  let registerX = 1;
  const cycles = [registerX];
  const importantCycles = [20, 60, 100, 140, 180, 220];

  program.forEach((instruction) => {
    const [command, value] = instruction;
    if (command === "noop") cycles.push(registerX);
    if (command === "addx") {
      cycles.push(registerX);

      registerX += +value;
      cycles.push(registerX);
    }
  });

  const signalStrengthsSum = importantCycles
    .map((cycleNumber) => cycles[cycleNumber - 1] * cycleNumber)
    .reduce((a, b) => a + b, 0);

  return signalStrengthsSum;
};

const partTwo = () => {
  let registerX = 1;
  let crtPosition = 0;
  let output = [];

  program.forEach((instruction) => {
    const [command, value] = instruction;

    [registerX - 1, registerX, registerX + 1].includes(crtPosition)
      ? output.push("█")
      : output.push(".");

    if (command === "noop")
      crtPosition >= 0 && crtPosition < 39 ? crtPosition++ : (crtPosition = 0);

    if (command === "addx") {
      crtPosition >= 0 && crtPosition < 39 ? crtPosition++ : (crtPosition = 0);

      [registerX - 1, registerX, registerX + 1].includes(crtPosition)
        ? output.push("█")
        : output.push(".");

      crtPosition >= 0 && crtPosition < 39 ? crtPosition++ : (crtPosition = 0);

      registerX += +value;
    }
  });

  const crtDisplay = [];
  for (let i = 0; i < output.length; i += 40) {
    crtDisplay.push(output.slice(i, i + 40));
  }

  return crtDisplay.map((group) => group.join(""));
};

console.log(partOne());
console.log(partTwo());
