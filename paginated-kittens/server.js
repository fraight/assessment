const express = require('express');
const RateLimit = require('express-rate-limit');
const app = express();
const {
  NUM_ITEMS_FLOOR,
  NUM_ITEMS_CEIL,
  PER_PAGE,
  RATE_LIMIT_WINDOW,
  RATE_LIMIT_MAX,
  RATE_LIMIT_DELAY_MS
} = require('./constants');
const { makeRecords, randInt } = require('./lib');

const limiter = new RateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  max: RATE_LIMIT_MAX,
  delayMs: RATE_LIMIT_DELAY_MS
});

const total = randInt(NUM_ITEMS_FLOOR, NUM_ITEMS_CEIL);
const totalPages = Math.ceil(total / PER_PAGE);

app.get('/', limiter, (req, res) => {
  const { page = 0 } = req.query;
  const alreadyCovered = page * PER_PAGE;
  const remaining = total - alreadyCovered;
  const numToGenerage = Math.min(remaining, PER_PAGE);
  res.json({
    total,
    records: makeRecords(numToGenerage)
  });
});

app.get('/count', (req, res) => res.json(total));

const server = app.listen(7000);

module.exports = {
  stop() {
    server.close();
  }
}