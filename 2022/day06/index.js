const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("");

const getMarker = (characters) => {
  for (let i = 0; i < input.length; i++) {
    if (new Set(input.slice(i, i + characters)).size === characters) {
      return i + characters;
    }
  }
};

console.log(getMarker(4));
console.log(getMarker(14));
