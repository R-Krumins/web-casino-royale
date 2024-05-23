const { Stock, StockDataPoint } = require("../models/stockModel");
const log = require("../lib/logger")();

async function findStock(req, res) {
  const q = req.query.q;
  const stock = req.stock;

  if (!stock) {
    return res
      .status(404)
      .json({ success: false, msg: `No results for '${q}'` });
  }

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

async function getStocks(req, res) {
  const { stocks, date } = req.body;

  //TODO: find or create a lib function for this checks
  if (!stocks)
    return res.status(400).json({ error: "stocks property required!" });
  if (!date) return res.status(400).json({ error: "date property required!" });

  if (!/^(\d\d\d\d-\d\d-\d\d)$/.test(date))
    res.status(400).json({ error: "date format must be yyyy-MM-dd" });

  const querry = stocks.map((q) => {
    return { _id: q };
  });

  try {
    const resp = await Stock.find(
      { $or: querry, "data.date": date },
      { "data.$": 1 }
    );

    if (resp) return res.status(200).json(resp);

    return res.status(500).json({ error: "Fucky wucky UwU" });
  } catch (error) {
    log.error(error);
    return res.status(500).json({ error });
  }
}

module.exports = {
  findStock,
  getStockBySymbol,
  getStocks,
};
