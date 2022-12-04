const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\n")
  .map((pair) => pair.split(/[,-]/).map((num) => Number(num)));

const partOne = () => {
  const filtered = input.filter(
    (pair) =>
      (pair[2] >= pair[0] && pair[3] <= pair[1]) ||
      (pair[2] <= pair[0] && pair[3] >= pair[1])
  );
  return filtered.length;
};

const partTwo = () => {
  const filtered = input.filter(
    (pair) =>
      (pair[2] < pair[0] && pair[3] >= pair[0]) ||
      (pair[0] <= pair[2] && pair[2] <= pair[1])
  );
  return filtered.length;
};
