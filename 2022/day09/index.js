const fs = require("fs");
const motions = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map((row) => row.split(" "))
  .map(([direction, steps]) => [direction, Number(steps)]);

const isTailTooFar = (head, tail) =>
  Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1;

const moveTail = (head, tail) => {
  if (head.x > tail.x && head.y === tail.y) tail.x++; // right
  if (head.x < tail.x && head.y === tail.y) tail.x--; // left
  if (head.x === tail.x && head.y > tail.y) tail.y++; // up
  if (head.x === tail.x && head.y < tail.y) tail.y--; // down

  if (head.x > tail.x && head.y > tail.y) {
    // up right
    tail.x++;
    tail.y++;
  }

  if (head.x < tail.x && head.y > tail.y) {
    // up left
    tail.x--;
    tail.y++;
  }

  if (head.x > tail.x && head.y < tail.y) {
    // down right
    tail.x++;
    tail.y--;
  }

  if (head.x < tail.x && head.y < tail.y) {
    // down left
    tail.x--;
    tail.y--;
  }
};

const partOne = () => {
  let head = { x: 0, y: 0 };
  let tail = { x: 0, y: 0 };
  const positions = new Set(["0,0"]);

  for (let [direction, steps] of motions) {
    for (let i = 0; i < steps; i++) {
      if (direction === "R") head.x++;
      if (direction === "L") head.x--;
      if (direction === "U") head.y++;
      if (direction === "D") head.y--;

      if (isTailTooFar(head, tail)) {
        moveTail(head, tail);
        positions.add(`${tail.x},${tail.y}`);
      }
    }
  }

  return positions.size;
};

const partTwo = () => {
  let knots = Array(10)
    .fill()
    .map(() => ({ x: 0, y: 0 }));
  const positions = new Set(["0,0"]);

  for (let [direction, steps] of motions) {
    for (let i = 0; i < steps; i++) {
      if (direction === "R") knots[0].x++;
      if (direction === "L") knots[0].x--;
      if (direction === "U") knots[0].y++;
      if (direction === "D") knots[0].y--;

      for (let j = 0; j < knots.length - 1; j++) {
        if (isTailTooFar(knots[j], knots[j + 1])) {
          moveTail(knots[j], knots[j + 1]);
        }
        if (j === 8) {
          positions.add(`${knots[j + 1].x},${knots[j + 1].y}`);
        }
      }
    }
  }

  return positions.size;
};

console.log(partOne());
console.log(partTwo());
