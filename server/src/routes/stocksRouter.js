const exprss = require("express");
const stockRouter = exprss.Router();
const searchStockIndex = require("../middleware/searchStockIndex");
const {
  findStock,
  getStockBySymbol,
  getStockInfo,
} = require("../controllers/stocksController");

stockRouter.route("/search").get(searchStockIndex, findStock);
stockRouter.route("/info/:id").get(getStockInfo);
stockRouter.route("/:id").get(getStockBySymbol);

module.exports = stockRouter;
