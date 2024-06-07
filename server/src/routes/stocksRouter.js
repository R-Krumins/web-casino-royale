const exprss = require("express");
const stockRouter = exprss.Router();
const searchStockIndex = require("../middleware/searchStockIndex");
const {
  findStock,
  getStockBySymbol,
  getStocks,
} = require("../controllers/stocksController");

stockRouter.route("/search").get(searchStockIndex, findStock);
stockRouter.route("/").post(getStocks);
stockRouter.route("/:id").get(getStockBySymbol);

module.exports = stockRouter;
