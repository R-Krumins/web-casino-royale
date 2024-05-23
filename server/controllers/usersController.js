const { User } = require("../models/userModel");
const { Stock } = require("../models/stockModel");
const { getStocks } = require("./stocksController");
const log = require("../lib/logger")();

async function getUser(req, res) {
  const { username } = req.params;
  console.log(username);

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

// TODO: combine PATCH and POST into one functino for data integrity

async function portfolio_PATCH(req, res) {
  const _id = req.user._id;
  const { id, amount } = req.query;

  if (!id) return res.status(400).send({ error: "id required" });
  if (!amount) return res.status(400).send({ error: "amount required" });

  const filter = { _id, "portfolio.id": id };
  const update = { $set: { "portfolio.$.amount": amount } };
  const options = { new: true };

  try {
    const resp = await User.findOneAndUpdate(filter, update, options);

    if (resp) return res.status(200).json(resp.portfolio);

    return res.status(400).json({
      error:
        "Failure on patch. Maybe the item does not exist in the user's portfolio?",
    });
  } catch (error) {
    log.error(error);
    res.status(500).json({ error });
  }
}

async function portfolio_POST(req, res) {
  const _id = req.user._id;
  const { id, amount } = req.query;

  if (!id) return res.status(400).send({ error: "id required" });
  if (!amount) return res.status(400).send({ error: "amount required" });

  const filter = { _id };
  const update = { $push: { portfolio: { id, amount } } };
  const options = { new: true };

  try {
    const resp = await User.findOneAndUpdate(filter, update, options);

    if (resp) return res.status(200).json(resp.portfolio);

    return res.status(400).json({
      error: "Failure to push.",
    });
  } catch (error) {
    log.error(error);
    res.status(500).json({ error });
  }
}

// Querry stocks collection with users portfolio items and date point
// basicly get the data of alll users owned stocks on particular date
async function portfolioItemsDatePoint_GET(req, res) {
  const { date } = req.params;
  const stocks = req.user.portfolio.map((i) => {
    return { _id: i.id };
  });

  const resp = await Stock.find(
    { $or: stocks, "data.date": date },
    { "data.$": 1 }
  );

  return res.status(200).json(resp);
}

module.exports = {
  getUser,
  portfolio_PATCH,
  portfolio_POST,
  portfolio_GET,
  portfolioItemsDatePoint_GET,
};
