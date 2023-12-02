const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const gamesData = input
  .split("\n")
  .map((line) => line.split(": "))
  .map((line) => {
    let [game, subsetsRaw] = line;
    game = Number(game.replace("Game ", ""));

    const subsets = subsetsRaw.split("; ").map((subset) => subset.split(", "));

    return [game, subsets];
  });

// PART ONE

const partOne = () => {
  const bag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return gamesData
    .map(([gameId, subsets]) => {
      const isGamePossible = subsets.map((subset) => {
        const areSubGamesPossible = subset.map((cubes) => {
          const [amount, type] = cubes.split(" ");

          return Number(amount) <= bag[type];
        });

        return !areSubGamesPossible.includes(false);
      });

      return isGamePossible.includes(false) ? null : gameId;
    })
    .reduce((prev, curr) => curr + prev, 0);
};

// PART TWO

const partTwo = () => {
  return gamesData
    .map(([, subsets]) => {
      const bag = {
        red: 0,
        green: 0,
        blue: 0,
      };

      subsets.forEach((subset) => {
        subset.forEach((cubes) => {
          const [amount, type] = cubes.split(" ");

          if (Number(amount) > bag[type]) {
            bag[type] = Number(amount);
          }
        });
      });

      return bag.red * bag.blue * bag.green;
    })
    .reduce((prev, curr) => curr + prev, 0);
};
