const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

// PART ONE

const partOne = () => {
  return input
    .map((line) => line.match(/\d/g))
    .map((line) => Number(line.at(0) + line.at(-1)))
    .reduce((prev, curr) => curr + prev, 0);
};

// PART TWO

const nums = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const partTwo = () => {
  return input
    .map((line) =>
      line
        .replace("oneight", "oneeight")
        .replace("twone", "twoone")
        .replace("threeight", "threeeight")
        .replace("eighthree", "eightthree")
        .replace("fiveight", "fiveeight")
        .replace("sevenine", "sevennine")
        .replace("eightwo", "eighttwo")
        .replace("nineight", "nineeight")
        .match(/one|two|three|four|five|six|seven|eight|nine|\d/g)
    )
    .map((line) => line.map((number) => nums[number] || number))
    .map((line) => Number(line.at(0) + line.at(-1)))
    .reduce((prev, curr) => curr + prev, 0);
};
