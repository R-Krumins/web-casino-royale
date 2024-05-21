const exprss = require("express");
const stockRouter = exprss.Router();
const searchStockIndex = require("../middleware/searchStockIndex");
const {
  findStock,
  getStockBySymbol,
} = require("../controllers/stocksController");

stockRouter.route("/search").get(searchStockIndex, findStock);
stockRouter.route("/:id").get(getStockBySymbol);

module.exports = stockRouter;
