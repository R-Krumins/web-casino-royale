const searchStocks = require("./searchStocks");

function findStock(req, res) {
  const q = req.query.q;
  const stocks = searchStocks(q);

  if (!stocks) {
    return res
      .status(404)
      .json({ success: false, msg: `No results for '${q}'` });
  }

  console.log(`Searhed for ${q}`);
  res.status(200).json({ success: true, data: stocks });
}

module.exports = {
  findStock,
};
