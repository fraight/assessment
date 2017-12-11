const uuidv4 = require('uuid/v4');

function randInt(floor, ceil) {
  if (ceil <= floor) {
    throw new RangeError(`param 2, ceil ${ceil} is smaller than param1 floor ${floor}`);
  }
  return floor + Math.floor(Math.random() * (ceil - floor));
}

function takeRandom(arr) {
  return arr[randInt(0, arr.length)];
}

function recordFactory() {
  const firstNames = ['fluffy', 'little'];
  const lastNames = ['cuddles', 'leonard', 'Ruth Bader Ginsburg'];
  const id = uuidv4();
  return {
    id,
    first: takeRandom(firstNames),
    last: takeRandom(lastNames),
    scratchProbability: Math.random(),
    purrProbability: Math.random(),
  };
}

function makeRecords(n) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(recordFactory());
  }
  return arr;
}

module.exports = {
  makeRecords,
  randInt
};
