const { User } = require("../models/userModel");
const { Stock } = require("../models/stockModel");
const { getStocks } = require("./stocksController");
const log = require("../lib/logger")();
const { validationResult } = require("express-validator")

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

// request to update an item in users portfolio array
// OR push new, if the item does not already exist
async function portfolio_POST(req, res) {
  
  const vr = validationResult(req);
  if(!vr.isEmpty()) return res.status(400).json({ error: vr.array()});
  
  const user = req.user;
  const { id, amount } = req.query;

  const itemExists = user.portfolio.some(x => x.id === id);

  const options = {new: true};

  try {
    const result = itemExists
      ? await User.findOneAndUpdate({_id: user._id, "portfolio.id": id}, {$set: {"portfolio.$.amount": amount}}, options)
      : await User.findOneAndUpdate({_id: user._id}, {$push: {portfolio: {id, amount}}}, options);

      console.log(result);
      return res.status(200).json(
        {msg: itemExists ? "Updated portfolio item" : "Inserted new portfolio item",
        portfolio: result.portfolio
      });
  } catch (error) {
    log.error(error)
    res.status(200).json({error});
  }  
}

// gets the data of alll users owned stocks on particular date
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
  portfolio_GET,
  portfolioItemsDatePoint_GET,
  portfolio_POST
};
