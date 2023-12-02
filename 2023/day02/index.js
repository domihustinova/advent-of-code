const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8");

const gamesData = input
  .split("\n")
  .map((line) => line.split(": "))
  .map((line) => {
    const [game, subsetsRaw] = line;
    const gameId = Number(game.replace("Game ", ""));
    const subsets = subsetsRaw
      .split("; ")
      .join(", ")
      .split(", ")
      .map((cube) => {
        const [count, type] = cube.split(" ");
        return [Number(count), type];
      });

    return { gameId, subsets };
  });

// PART ONE

const partOne = () => {
  const bag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  return gamesData
    .filter(({ subsets }) =>
      subsets.every(([count, type]) => count <= bag[type])
    )
    .reduce((total, { gameId }) => gameId + total, 0);
};

// PART TWO

const partTwo = () => {
  return gamesData
    .map(({ subsets }) => {
      const bag = {
        red: 0,
        green: 0,
        blue: 0,
      };

      subsets.forEach(([count, type]) => {
        if (count > bag[type]) {
          bag[type] = count;
        }
      });

      return bag.red * bag.blue * bag.green;
    })
    .reduce((total, curr) => curr + total, 0);
};
