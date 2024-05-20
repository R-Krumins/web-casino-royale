const exprss = require("express");
const userRouter = exprss.Router();
const { getUser, createUser } = require("../controllers/usersController");

userRouter.route("/:userName").get(getUser);
userRouter.route("/").post(createUser);

module.exports = userRouter;
