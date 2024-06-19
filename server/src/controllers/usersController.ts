const { User } = require("../models/userModel");
const { getStocks } = require("./stocksController");
const log = require("../lib/logger")();
const { validationResult } = require("express-validator");
import { Request, Response } from "express";

async function getUser(req: Request, res: Response) {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
}

function badRequest(res: Response, msg: string) {
  res.status(400).json({ error: msg });
}

async function portfolio_GET(req: Request, res: Response) {
  // user document was already retrieved in auth middleware
  return res.status(200).json(req.body.user.portfolio);
}

async function portfolioBuy(req: Request, res: Response) {
  const { symbol, amount, price, user } = req.body;

  if (price > user.liquidCash) return badRequest(res, "Insufficient funds");

  const stockInPortfolio = user.portfolio.find((x: any) => x.id === symbol);

  try {
    let result;
    if (stockInPortfolio) {
      // INCREASE AMOUNT OF OWNED STOCK
      result = await User.findOneAndUpdate(
        { _id: user._id, "portfolio.id": symbol },
        { $inc: { liquidCash: -price, "portfolio.$.amount": amount } },
        { new: true, lean: true }
      );
    } else {
      // INSERT NEW STOCK IN PORTFOLIO
      result = await User.findOneAndUpdate(
        { _id: user._id },
        {
          $push: { portfolio: { id: symbol, amount } },
          $inc: { liquidCash: -price },
        },
        { new: true, lean: true }
      );
    }

    if (!result) throw new Error("Empty querry");
    res.status(200).json({ msg: "Order fullfilled" });
  } catch (error) {
    log.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}

async function portfolioSell(req: Request, res: Response) {
  const { symbol, amount, price, user } = req.body;

  const stockInPortfolio = user.portfolio.find((x: any) => x.id === symbol);

  if (!stockInPortfolio)
    return badRequest(res, "Cannot sell stock you do not own");
  if (stockInPortfolio.amount < amount)
    return badRequest(res, "Cannot sell more stock that you own");

  try {
    let result;
    if (stockInPortfolio.amount - amount === 0) {
      // SOLD ALL OWNED STOCK OF THAT TYPE, REMOVE ITEM FROM PORTFOLIO ENTIRELY
      result = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { portfolio: { id: symbol } }, $inc: { liquidCash: price } },
        { new: true, lean: true }
      );
    } else {
      // DECREASE STOCK AMOUNT
      result = await User.findOneAndUpdate(
        { _id: user._id, "portfolio.id": symbol },
        { $inc: { liquidCash: price, "portfolio.$.amount": -amount } },
        { new: true, lean: true }
      );
    }

    if (!result) throw new Error("Empty querry");
    res.status(200).json({ msg: "Order fullfilled" });
  } catch (error) {
    log.error(error);
    res.status(500).json({ error: "Server Error" });
  }
}

export { getUser, portfolioBuy, portfolioSell, portfolio_GET };
