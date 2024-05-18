const { Stock, StockDataPoint } = require("../models/Stock");

async function findStock(req, res) {
  const q = req.query.q;
  const stock = req.stock;

  if (!stock) {
    return res
      .status(404)
      .json({ success: false, msg: `No results for '${q}'` });
  }

  console.log(`Searhed for ${q}`); //TODO: move this to proper logger
  res.status(200).json({ success: true, data: stock });
}

async function getStockBySymbol(req, res) {
  const date = req.query.date;
  const id = req.params.id;

  let stock = undefined;

  if (date) {
    stock = await Stock.findOne(
      {
        _id: id,
        "data.date": date,
      },
      { "data.$": 1 }
    );
  } else {
    stock = await Stock.findOne({ _id: id });
  }

  if (stock) {
    res.status(200).json(stock);
  } else {
    res.status(404).json({ message: "Stock not found" });
  }
}

module.exports = {
  findStock,
  getStockBySymbol,
};
