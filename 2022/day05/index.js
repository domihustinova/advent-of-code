const fs = require("fs");
const [cratesInput, movesInput] = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n\n");

const moves = movesInput.split("\n").map((move) => move.split(" "));

const getCrates = () => {
  const cratesArray = cratesInput.split("\n");

  const reversedCrates = cratesArray
    .map((cratesRow) => {
      let newRow = "";

      for (let i = 0; i < cratesArray.length; i++) {
        let rowIndex = i * 4 + 2;
        newRow += cratesRow[rowIndex - 1];
      }
      return newRow;
    })
    .reverse()
    .splice(1);

  let crates = new Array();

  for (let i = 0; i < reversedCrates[0].length; i++) {
    let newCratesRow = "";
    for (let j = 0; j < reversedCrates.length; j++) {
      if (reversedCrates[j][i] !== " ") {
        newCratesRow += reversedCrates[j][i];
      }
    }
    crates.push(newCratesRow.split(""));
  }

  return crates;
};

const rearrangeCrates = (part = "one") => {
  let crates = getCrates();

  moves.forEach((moveRow) => {
    const [, moveStr, , fromStr, , toStr] = moveRow;

    const move = +moveStr;
    const from = +fromStr;
    const to = +toStr;

    let grabbedCrates;

    if (part === "one") {
      grabbedCrates = crates[from - 1].splice(-move).reverse();
    } else if (part === "two") {
      grabbedCrates = crates[from - 1].splice(-move);
    }
    crates[to - 1].push(...grabbedCrates);
  });

  return crates;
};

const partOne = () => {
  const movedCrates = rearrangeCrates();
  return movedCrates.map((crate) => crate[crate.length - 1]).join("");
};

const partTwo = () => {
  const movedCrates = rearrangeCrates("two");
  return movedCrates.map((crate) => crate[crate.length - 1]).join("");
};
