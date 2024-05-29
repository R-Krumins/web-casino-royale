const { User } = require("../models/userModel");
const { Stock } = require("../models/stockModel");
const { getStocks } = require("./stocksController");
const log = require("../lib/logger")();
const { validationResult } = require("express-validator");
const { updatePortfolio } = require("../socket/portfolioCache");

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

  if (result.error) {
    return res.status(400).json(result);
  }
  if (result.failure) {
    log.error(result);
    return res.status(500).json({ error: "Server kaput" });
  }

  // TODO: the best way would to add mongoose middlewar for whenever
  // user portfolio changes, but i don't know how to do it for a subdocument -_-
  updatePortfolio(user._id, result.portfolio);
  return res.status(200).json({ success: "Updated" });
}

async function portfolioUpdateExisting(id, amount, userID) {
  try {
    if (amount < 0)
      return {
        error: `Bad request. Editing ${id} bv requested amount would bring it to ${amount}`,
      };

    if (amount === 0)
      return await User.findOneAndUpdate(
        { _id: userID },
        { $pull: { portfolio: { id } } },
        { new: true }
      );

    return await User.findOneAndUpdate(
      { _id: userID, "portfolio.id": id },
      { $set: { "portfolio.$.amount": amount } },
      { new: true }
    );
  } catch (error) {
    return { failure: error };
  }
}

async function porfolioInserNew(id, amount, userID) {
  try {
    if (amount < 0)
      return {
        error: "Bad request. Cannot insert new item with negative amount.",
      };

    return await User.findOneAndUpdate(
      { _id: userID },
      { $push: { portfolio: { id, amount } } },
      { new: true }
    );
  } catch (error) {
    return { failure: error };
  }
}

// gets the data of alll users owned stocks on particular date
async function portfolioItemsDatePoint_GET(req, res) {
  const { date } = req.params;
  const stocks = req.user.portfolio.map((i) => {
    return { _id: i.id };
  });

  let resp = await Stock.find(
    { $or: stocks, "data.date": date },
    { "data.$": 1 },
    { lean: true }
  );

  // this is potentially stupid but oh well
  resp = resp.map((x) => {
    return { id: x._id, amount: 0, ...x.data[0] };
  });

  return res.status(200).json(resp);
}

module.exports = {
  getUser,
  portfolio_GET,
  portfolioItemsDatePoint_GET,
  portfolio_POST,
};
