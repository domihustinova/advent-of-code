const fs = require("fs");
const grid = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(""))
  .map((row) => row.map(Number));

const partOne = () => {
  const visibleTreesGrid = grid.map((row, indexRow) => {
    return row.map((tree, treeIndex) => {
      const isVisibleLeft = row
        .slice(0, treeIndex)
        .every((otherTree) => otherTree < tree);

      if (isVisibleLeft) {
        return 1;
      }

      const isVisibleRight = row
        .slice(treeIndex + 1)
        .every((otherTree) => otherTree < tree);

      if (isVisibleRight) {
        return 1;
      }

      const column = grid.map((row) => row[treeIndex]);

      const isVisibleTop = column
        .slice(0, indexRow)
        .every((otherTree) => otherTree < tree);

      if (isVisibleTop) {
        return 1;
      }

      const isVisibleBottom = column
        .slice(indexRow + 1)
        .every((otherTree) => otherTree < tree);

      if (isVisibleBottom) {
        return 1;
      }

      return 0;
    });
  });

  const totalVisibleTrees = visibleTreesGrid
    .map((row) => row.reduce((a, b) => a + b, 0))
    .reduce((a, b) => a + b, 0);

  return totalVisibleTrees;
};

const partTwo = () => {
  const newGrid = grid.map((row, indexRow) => {
    return row.map((tree, treeIndex) => {
      const getDistance = (tree, treesAround) => {
        const index = treesAround.findIndex((otherTree) => otherTree >= tree);
        let distance;

        if (index !== -1) {
          distance = index + 1;
        } else if (index === -1) {
          distance = treesAround.length;
        }

        return distance;
      };

      // RIGHT
      const treesOnTheRight = row.slice(treeIndex + 1);
      const right = getDistance(tree, treesOnTheRight);

      // LEFT
      const treesOnTheLeft = row.slice(0, treeIndex).reverse();
      const left = getDistance(tree, treesOnTheLeft);

      const column = grid.map((row) => row[treeIndex]);

      // BOTTOM
      const treesOnTheBottom = column.slice(indexRow + 1);
      const bottom = getDistance(tree, treesOnTheBottom);

      // TOP
      const treesOnTheTop = column.slice(0, indexRow).reverse();
      const top = getDistance(tree, treesOnTheTop);

      return right * left * bottom * top;
    });
  });

  return Math.max(...newGrid.map((row) => Math.max(...row)));
};

console.log(partOne());
console.log(partTwo());
