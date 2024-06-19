import express from "express";
const userRouter = express.Router();
const { param, query } = require("express-validator");
const requireAuth = require("../middleware/requireAuth");
import {
  getUser,
  portfolioBuy,
  portfolioSell,
  portfolio_GET,
} from "../controllers/usersController";

userRouter.use(requireAuth);

userRouter.route("/portfolio/buy").post(portfolioBuy);

userRouter.route("/portfolio/sell").post(portfolioSell);

userRouter.route("/portfolio").get(portfolio_GET);

userRouter.route("/:username").get(getUser);

module.exports = userRouter;
