import { truncate } from "fs/promises";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dataPointSchema = new Schema(
  {
    date: { type: String },
    open: { type: Number },
    high: { type: Number },
    low: { type: Number },
    close: { type: Number },
    adjclose: { type: Number },
    volume: { type: Number },
  },
  { _id: false }
);

const stockSchema = new Schema({
  _id: { type: String, required: true },
  data: {
    type: [dataPointSchema],
    required: true,
  },
});

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
stockSchema.statics.findManyByDate = function (stocks, date) {
  return this.aggregate(
    [
      { $match: { _id: { $in: stocks } } },
      { $unwind: { path: "$data" } },
      { $match: { "data.date": date } },
    ],
    { lean: true }
  );
};

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

const Stock = mongoose.model("Stock", stockSchema);
const StocksData = mongoose.model("stockData", stockDataSchema);
const StockMeta = mongoose.model("stockMeta", stockMetaSchema);

module.exports = {
  Stock,
  StocksData,
  StockMeta,
};
