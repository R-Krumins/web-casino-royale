const mongoose = require("mongoose");

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

const Stock = mongoose.model("Stock", stockSchema);

module.exports = {
  Stock,
};
