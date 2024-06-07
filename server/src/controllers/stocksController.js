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
  const id = req.params.id;
  const { from, to } = req.query;

  console.log(id, from, to);

  // check if dates valid
  const fromD = new Date(from);
  const toD = new Date(to);

  if (isNaN(fromD) || isNaN(toD))
    return res.status(400).json({ error: "Invalid dates" });
  if (fromD > toD)
    return res.status(400).json({ error: "From date is larger than to" });

  try {
    const result = await Stock.aggregate([
      { $match: { _id: id } },
      { $unwind: "$data" },
      { $match: { "data.date": { $gte: from, $lte: to } } },
      { $group: { _id: "$_id", data: { $push: "$data" } } },
    ]);

    return res.status(200).json({ data: result[0].data });
  } catch (error) {
    log.error(error);
    return res.status(500).json({ error: "Server error" });
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
