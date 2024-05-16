const exprss = require("express");
const router = exprss.Router();
const { findStock } = require("../controllers/stocks");

router.route("/search").get(findStock);

module.exports = router;
