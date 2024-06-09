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

  // return this.find({
  //   symbol: "AAPL",
  //   // date: { $gte: "2018-01-01", $lte: "2020-05-01" },
  // });
};

const Stock = mongoose.model("Stock", stockSchema);
const StocksData = mongoose.model("stockData", stockDataSchema);

module.exports = {
  Stock,
  StocksData,
};
