const exprss = require("express");
const authRouter = exprss.Router();
const {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logout,
} = require("../controllers/authController");

authRouter.route("/signup").get(signupGet);
authRouter.route("/signup").post(signupPost);
authRouter.route("/login").get(loginGet);
authRouter.route("/login").post(loginPost);
authRouter.route("/logout").get(logout);

module.exports = authRouter;
