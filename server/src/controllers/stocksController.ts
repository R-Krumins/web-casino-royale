const { StocksData, StockMeta } = require("../models/stockModel");
const log = require("../lib/logger")();
import { type Request, type Response } from "express";

async function findStock(req: Request, res: Response) {
  const q = req.query.q;
  const stock = req.body.stock;

  if (!stock) {
    return res
      .status(404)
      .json({ success: false, msg: `No results for '${q}'` });
  }

  res.status(200).json({ success: true, data: stock });
}

async function getStockBySymbol(req: Request, res: Response) {
  const id = req.params.id;
  const { from, to } = req.query as { from: string; to: string };

  // check if dates valid
  const fromD = new Date(from);
  const toD = new Date(to);

  // if (isNaN(fromD) || isNaN(toD))
  //   return res.status(400).json({ error: "Invalid dates" });
  if (fromD > toD)
    return res.status(400).json({ error: "From date is larger than to" });

  try {
    const result = await StocksData.findOneBetweenDates(id, from, to);
    return res.status(200).json({ data: result });
  } catch (error) {
    log.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

async function getStockInfo(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const data = await StockMeta.findOne({ _id: id });

    if (!data) {
      return res.status(400).json({ error: "No such stock" });
    }

    return res.status(200).json({ data });
  } catch (error) {
    log.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  findStock,
  getStockBySymbol,
  getStockInfo,
};
