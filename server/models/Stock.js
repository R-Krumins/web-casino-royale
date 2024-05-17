const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StockSchema = new Schema({
  _id: { type: String, required: true },
  data: {
    type: [
      {
        date: { type: String },
        open: { type: Number },
        high: { type: Number },
        low: { type: Number },
        close: { type: Number },
        adjclose: { type: Number },
        volume: { type: Number },
      },
    ],
    required: true,
  },
});

const Stock = mongoose.model("Stock", StockSchema);

module.exports = {
  Stock,
};