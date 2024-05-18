const exprss = require("express");
const stockRouter = exprss.Router();
const { findStock, getStockBySymbol } = require("../controllers/stocks");
const searchStockIndex = require("../middleware/searchStockIndex");

stockRouter.route("/search").get(searchStockIndex, findStock);
stockRouter.route("/:id").get(getStockBySymbol);

module.exports = stockRouter;
