const fs = require("fs");
const input = fs.readFileSync("input.txt", "utf-8").split("\n\n");

const monkeys = input.map((inputRow) => {
  const monkey = inputRow.split("\n");
  const items = monkey[1].match(/[\d][\d]/g).map(Number);
  const [action, value] = monkey[2].match(/(?<=old\s).*/)[0].split(" ");
  const divisibleValue = Number(monkey[3].match(/(?<=by\s).*/)[0]);
  const testTrue = monkey[4].match(/(?<=monkey\s).*/)[0];
  const testFalse = monkey[5].match(/(?<=monkey\s).*/)[0];

  return {
    items: items,
    operation: {
      action: action,
      value: value,
    },
    test: {
      divisibleValue: divisibleValue,
      testTrue: testTrue,
      testFalse: testFalse,
    },
    inspected: 0,
  };
});

const partOne = () => {
  for (let i = 0; i < 20; i++) {
    for (let monkey of monkeys) {
      const { items, operation, test } = monkey;
      const { divisibleValue, testTrue, testFalse } = test;
      let newWorryLevel;
      let itemsLength = items.length;

      for (let i = 0; i < itemsLength; i++) {
        let item = monkey.items.shift();

        const { action, value: valueOriginal } = operation;
        const value = valueOriginal === "old" ? item : +valueOriginal;

        if (action === "*") newWorryLevel = item * value;
        if (action === "+") newWorryLevel = item + value;

        newWorryLevel = Math.floor(newWorryLevel / 3);

        newWorryLevel % divisibleValue === 0
          ? monkeys[testTrue].items.push(newWorryLevel)
          : monkeys[testFalse].items.push(newWorryLevel);

        monkey.inspected++;
      }
    }
  }
  const inspection = monkeys
    .map((monkey) => monkey.inspected)
    .sort((a, b) => b - a);

  const monkeyBusiness = inspection[0] * inspection[1];

  return monkeyBusiness;
};

console.log(partOne());
