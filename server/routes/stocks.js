const exprss = require("express");
const router = exprss.Router();
const { findStock } = require("../controllers/stocks");
const searchStockIndex = require("../middleware/searchStockIndex");

router.route("/search").get(searchStockIndex, findStock);

module.exports = router;
