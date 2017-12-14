const { getAll, filterByRatio } = require('./solution');
const axios = require('axios');
const { stop } = require('./server');

describe('Paginated Resource', function() {
  after(stop);

  this.timeout(4000);
  describe('getAll', () => {
    it('returns a promise', () => {
      const result = getAll();
      const itsAPromise = result instanceof Promise;
      if (!itsAPromise) {
        throw new Error(`expected \`getAll\` to return a promise, but it returned \`${result.constructor.name}\``);
      }
      return result;
    });

    it('gets all records', async () => {
      const { data: count } = await axios.get('http://localhost:7000/count');
      const records = await getAll();
      if (records.length !== count) {
        throw new Error(`Incorrect number of records, expected ${count} got ${records.length}`);
      }
    })
  });

  describe('filterByRatio', () => {
    it('returns a promise', () => {
      const result = filterByRatio();
      const itsAPromise = result instanceof Promise;
      if (!itsAPromise) {
        throw new Error(`expected \`filterByRatio\` to return a promise, but it returned \`${result.constructor.name}\``);
      }
      return result;
    });

    it('returns only kittens with `scratchProbability` / `purrProbability` below max', async () => {
      const filtered = await filterByRatio(0, 0.6);
      const allBelowMax = filtered.every(kitten => kitten.scratchProbability / kitten.purrProbability < 0.6);
      if (!allBelowMax) {
        throw new Error('Uh oh! There were kittens above the max ratio');
      }
    });

    it('returns only kittens with ratio above min', async () => {
      const filtered = await filterByRatio(0.2, 1);
      const allBelowMax = filtered.every(kitten => kitten.scratchProbability / kitten.purrProbability > 0.2);
      if (!allBelowMax) {
        throw new Error('Uh oh! There were kittens below the min ratio');
      }
    })
  });
});
