const { User } = require("../models/userModel");
const { Stock } = require("../models/stockModel");
const { getStocks } = require("./stocksController");
const log = require("../lib/logger")();
const { validationResult } = require("express-validator");

async function getUser(req, res) {
  const { username } = req.params;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
}

async function portfolio_GET(req, res) {
  // user document was already retrieved in auth middleware
  return res.status(200).json(req.user.portfolio);
}

// if item exists in user portfolio, add to amount
// if tiem does not exist, push the new item
async function portfolio_POST(req, res) {
  const vr = validationResult(req);
  if (!vr.isEmpty()) return res.status(400).json({ error: vr.array() });

  const user = req.user;
  const { id, amount } = req.query;

  const item = user.portfolio.find((x) => x.id === id);

  let result;
  if (item) {
    const amountSummed = parseInt(item.amount) + parseInt(amount);
    result = await portfolioUpdateExisting(id, amountSummed, user._id);
  } else {
    result = await porfolioInserNew(id, parseInt(amount), user._id);
  }

  if (result.success) {
    return res.status(200).json({ success: result.success, msg: result.msg });
  } else {
    res.status(400).json(result);
  }
}

async function portfolioUpdateExisting(id, amount, userID) {
  try {
    if (amount < 0)
      return {
        success: false,
        msg: "Cannot sell more stock than you own.",
      };

    if (amount === 0) {
      const resp = await User.findOneAndUpdate(
        { _id: userID },
        { $pull: { portfolio: { id } } },
        { new: true, lean: true }
      );

      return resp
        ? { success: true, msg: `Sold all owned ${id}.`, resp }
        : { success: false, msg: "Server error. DB resp null." };
    }

    const resp = await User.findOneAndUpdate(
      { _id: userID, "portfolio.id": id },
      { $set: { "portfolio.$.amount": amount } },
      { new: true, lean: true }
    );

    return resp
      ? { success: true, msg: `Order fullfilled.`, resp }
      : { success: false, msg: "Server error. DB resp null." };
  } catch (error) {
    log.error(error);
    return { success: false, msg: "Server error." };
  }
}

async function porfolioInserNew(id, amount, userID) {
  try {
    if (amount < 0)
      return {
        success: false,
        msg: "Cannot sell stock you dont't own.",
      };

    const resp = await User.findOneAndUpdate(
      { _id: userID },
      { $push: { portfolio: { id, amount } } },
      { new: true, lean: true }
    );

    return resp
      ? { success: true, msg: "Buy order fullfilled.", resp }
      : { success: false, msg: "Server error. DB resp null." };
  } catch (error) {
    log.error(error);
    return { success: false, msg: "Server error." };
  }
}

// gets the data of alll users owned stocks on particular date
// !!!DEPRECATED!!!
async function portfolioItemsDatePoint_GET(req, res) {
  const { date } = req.params;
  const portfolio = req.user.portfolio;
  const stocks = portfolio.map((x) => x.id);

  let resp = await Stock.findManyByDate(stocks, date);

  resp.forEach(
    (x) => (x.amount = portfolio.find((y) => y.id === x._id).amount)
  );

  return res.status(200).json(resp);
}

module.exports = {
  getUser,
  portfolio_GET,
  portfolioItemsDatePoint_GET,
  portfolio_POST,
};
