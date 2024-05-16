const Fuse = require("fuse.js");
const data = require("./index.json");

// how many search resulst to return?
const RESULTS_COUNT = 5;

// Set up options for fuzzy search
const options = {
  includeScore: true,
  keys: ["name"],
};

const fuse = new Fuse(data, options);

function searchStocks(searchTerm) {
  const results = fuse.search(searchTerm);
  return results.slice(0, RESULTS_COUNT);
}

module.exports = searchStocks;
