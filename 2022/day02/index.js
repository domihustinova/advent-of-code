const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const strategyGuide = input.split("\n").map((game) => game.replace(" ", ""));

const strategyRightScoreMap = {
  X: [1, 0],
  Y: [2, 3],
  Z: [3, 6],
};

const strategyScoreMap = {
  CX: [6, 2],
  AY: [6, 1],
  BZ: [6, 3],
  AX: [3, 3],
  BY: [3, 2],
  CZ: [3, 1],
  BX: [0, 1],
  CY: [0, 3],
  AZ: [0, 2],
};

const getTotalScore = (part) =>
  strategyGuide
    .map(
      (game) =>
        strategyRightScoreMap[game[1]][part] + strategyScoreMap[game][part]
    )
    .reduce((sum, current) => sum + current);

console.log(getTotalScore(0), getTotalScore(1));
