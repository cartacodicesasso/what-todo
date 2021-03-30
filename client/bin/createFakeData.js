const faker = require("faker");

console.log(
  new Array(10).fill(null).map((_, index) => ({
    id: index + 1,
    title: faker.lorem.words(5),
    text: faker.lorem.text(),
    dueDate: faker.date.soon(10),
    isDone: Math.random() >= 0.5,
  }))
);
