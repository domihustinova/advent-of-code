const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf8").split("\n");

const getPriority = (item) => {
  const charCode = item.charCodeAt();
  return charCode >= 97 ? charCode - 96 : charCode - 38;
};

// PART ONE

const partOne = () => {
  const commonItemsOne = input.map((rucksack) => {
    const totalItems = rucksack.length;

    const firstCompartment = rucksack.slice(0, totalItems / 2);
    const secondCompartment = rucksack.slice(totalItems / 2);

    return [...firstCompartment].find((itemFirst) =>
      [...secondCompartment].includes(itemFirst)
    );
  });

  return commonItemsOne
    .map((item) => getPriority(item))
    .reduce((a, b) => a + b, 0);
};

// PART TWO

const partTwo = () => {
  let rucksacksGroups = [];
  for (let i = 0; i < input.length; i += 3) {
    let subGroup = input.slice(i, i + 3);
    rucksacksGroups.push(subGroup);
  }

  const commonItemsTwo = rucksacksGroups.map((group) => {
    return [...group[0]].find((itemFirstRucksack) =>
      group.every((singleRucksack) =>
        singleRucksack.includes(itemFirstRucksack)
      )
    );
  });

  return commonItemsTwo
    .map((item) => getPriority(item))
    .reduce((a, b) => a + b, 0);
};
