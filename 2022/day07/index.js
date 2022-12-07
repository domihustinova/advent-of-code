const fs = require("fs");
const terminalRows = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(" "))
  .slice(1);

class Directory {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
    this.children = [];
  }

  add(row) {
    if (row[0] === "dir") {
      this.children.push(new Directory(row[1], this));
    } else {
      this.children.push(new File(row[0], row[1]));
    }
  }

  size() {
    return this.children.reduce((prev, curr) => {
      if (curr instanceof File) {
        return prev + Number(curr.size);
      } else if (curr instanceof Directory) {
        return prev + curr.size();
      }
      return prev;
    }, 0);
  }
}

class File {
  constructor(size, name) {
    this.size = size;
    this.name = name;
  }
}

let root = new Directory("/", null);
const directoriesSizes = [];

const partOne = () => {
  let currentDir = root;

  terminalRows.forEach((row) => {
    if (row[0] === "$") {
      if (row[1] === "cd") {
        if (row[2] === "..") {
          currentDir = currentDir.parent;
        } else {
          currentDir = currentDir.children.filter(
            (child) => child.name === row[2]
          )[0];
        }
      }
    } else {
      currentDir.add(row);
    }
  });

  function getDirectoriesSizes(dir) {
    directoriesSizes.push(dir.size());

    for (child of dir.children) {
      if (child instanceof Directory) {
        getDirectoriesSizes(child);
      }
    }
  }

  getDirectoriesSizes(root);

  const smalldirectoriesSizesTotal = directoriesSizes
    .filter((size) => size <= 100000)
    .reduce((a, b) => a + b, 0);

  return smalldirectoriesSizesTotal;
};

const partTwo = () => {
  const totalDiskSpace = 70000000;
  const rootSize = root.size();
  const unusedSpace = totalDiskSpace - rootSize;
  const neededFreeSpace = 30000000 - unusedSpace;

  return directoriesSizes
    .sort((a, b) => a - b)
    .find((size) => size >= neededFreeSpace);
};

console.log(partOne());
console.log(partTwo());
