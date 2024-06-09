import { truncate } from "fs/promises";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const stockDataSchema = new Schema(
  {
    date: { type: Date },
    open: { type: Number },
    high: { type: Number },
    low: { type: Number },
    close: { type: Number },
    adjclose: { type: Number },
    volume: { type: Number },
    symbol: { type: String },
  },
  { collection: "stockData" }
);

const stockMetaSchema = new Schema(
  {
    _id: { type: String },
    src: { type: String },
    name: { type: String },
    industry: { type: String },
    desc: { type: String },
    logo: { type: String },
    wentPublic: { type: String },
  },
  { collection: "stockMeta" }
);

// static methods
stockDataSchema.statics.findOneBetweenDates = function (symbol, from, to) {
  return this.find(
    {
      symbol: symbol,
      date: {
        $gte: from,
        $lte: to,
      },
    },
    { _id: 0, symbol: 0 },
    { lean: true }
  );
};

const StockData = mongoose.model("stockData", stockDataSchema);
const StockMeta = mongoose.model("stockMeta", stockMetaSchema);

module.exports = {
  StockData,
  StockMeta,
};
