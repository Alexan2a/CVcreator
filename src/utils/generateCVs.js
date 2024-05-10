export function generateCVs(n) {
  var Chance = require("chance");
  var chance = new Chance();
  let cvs = [];
  for (let i = 0; i < n; i++) {
    let item = {
      id: chance.guid(),
      date: chance.date(),
      name: chance.word(),
    };
    cvs.push(item);
  }
  return cvs;
}
