const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StockDataPointSchema = new Schema(
  {
    Date: { type: Date },
    Open: { type: Number },
    High: { type: Number },
    Low: { type: Number },
    Close: { type: Number },
    AdjClose: { type: Number },
    Volume: { type: Number },
  },
  { _id: false }
);

const StockSchema = new Schema({
  stock: { type: String, required: true },
  data: { type: [StockDataPointSchema], required: true },
});

const Stock = mongoose.model("Stock", StockSchema);
const StockDataPoint = mongoose.model("StockDataPoint", StockDataPointSchema);

module.exports = {
  Stock,
  StockDataPoint,
};
