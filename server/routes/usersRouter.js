const exprss = require("express");
const userRouter = exprss.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getUser,
  portfolio_PATCH,
  portfolio_POST,
  portfolio_GET,
} = require("../controllers/usersController");

userRouter.use(requireAuth);
userRouter.route("/portfolio").patch(portfolio_PATCH);
userRouter.route("/portfolio").post(portfolio_POST);
userRouter.route("/portfolio").get(portfolio_GET);
userRouter.route("/:username").get(getUser);

module.exports = userRouter;
