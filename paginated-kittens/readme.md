# Paginated Kittens

You're building software that connects to a big data kitten service, let's call it "Kittalytics"

(For the purposes of this exercise, the service's code can be found in `server.js`).

Kittalytics exposes a paginated kitten resource returning 15 kittens per page. 

To fire up the service, just run `npm start` and go to `http://localhost:7000`. (Be sure to close it before running the tests or it won't work!)

## problems
You can write your code in `solution.js`. To know if you're on the right track, feel free to run `npm test`.

### `getAll`
Our software needs a function that will return *all* the kittens. This method should repeatedly hit the kitten service getting all the pages.

Note, every time you rerun the tests, the total number of kittens changes, so you can't hard code it!

Also note: the API is rate limited, so you can't hit it too fast!

### `filterByRatio`
Every kitten returned by the service has a `scratchProbability` and a `purrProbability`. You should make a function that gets all kittens who's `scratchProbability / purrProbability` ratio lies between a min and max.