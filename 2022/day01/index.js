const fs = require("fs");
const list = fs
  .readFileSync("input.txt", "utf8")
  .split("\n\n")
  .map((data) => data.split("\n"));

const orderedCaloriesList = list
  .map((elfCaloriesList) =>
    elfCaloriesList.reduce((sum, current) => sum + Number(current), 0)
  )
  .sort((a, b) => b - a);

// PART ONE

const mostCalories = orderedCaloriesList[0];

// PART TWO

const threeMostCalories = orderedCaloriesList
  .slice(0, 3)
  .reduce((sum, current) => sum + current);
