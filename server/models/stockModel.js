const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DataPointSchema = new Schema(
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

const StockSchema = new Schema({
  _id: { type: String, required: true },
  data: {
    type: [DataPointSchema],
    required: true,
  },
});

const Stock = mongoose.model("Stock", StockSchema);

module.exports = {
  Stock,
};
