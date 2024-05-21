const exprss = require("express");
const userRouter = exprss.Router();
const requireAuth = require("../middleware/requireAuth");
const { getUser } = require("../controllers/usersController");

userRouter.use(requireAuth);
userRouter.route("/:username").get(getUser);

module.exports = userRouter;
