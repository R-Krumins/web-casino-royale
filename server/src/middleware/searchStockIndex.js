const Fuse = require("fuse.js");
const data = require("./stockIndex.json");

// how many search resulst to return?
const RESULTS_COUNT = 5;

// Set up options for fuzzy search
const options = {
  includeScore: false,
  keys: ["name"],
};

const fuse = new Fuse(data, options);

function searchStockIndex(req, res, next) {
  const results = fuse.search(req.query.q);
  req.stock = results.slice(0, RESULTS_COUNT);
  next();
}

module.exports = searchStockIndex;
