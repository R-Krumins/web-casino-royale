const exprss = require("express");
const userRouter = exprss.Router();
const { param, query } = require("express-validator")
const requireAuth = require("../middleware/requireAuth");
const {
  getUser,
  portfolio_POST,
  portfolio_GET,
  portfolioItemsDatePoint_GET,
} = require("../controllers/usersController");

userRouter.use(requireAuth);

userRouter.route("/portfolio").post(
  query("id", "Required").notEmpty().bail().isAlpha().withMessage("Letters only"),
  query("amount", "Required").notEmpty().bail().isInt().withMessage("Must be Int"),
  portfolio_POST
);

userRouter.route("/portfolio").get(portfolio_GET);

userRouter.route("/porfolio/date/:date").get(portfolioItemsDatePoint_GET);

userRouter.route("/:username").get(getUser);

module.exports = userRouter;
