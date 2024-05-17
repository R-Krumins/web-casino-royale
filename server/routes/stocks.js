const exprss = require("express");
const router = exprss.Router();
const { findStock, getStockBySymbol } = require("../controllers/stocks");
const searchStockIndex = require("../middleware/searchStockIndex");

router.route("/search").get(searchStockIndex, findStock);
router.route("/:symbol").get(getStockBySymbol);

module.exports = router;
