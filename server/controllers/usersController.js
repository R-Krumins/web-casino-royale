const { User } = require("../models/userModel");
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
  try {
    const resp = await User.findById(req.user._id);

    if (resp) return res.status(200).json(resp.portfolio);

    res.status(500).json({ error: "something went terribly wrong" });
  } catch (error) {
    log.error(error);
    res.status(500).json({ error });
  }
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

module.exports = {
  getUser,
  portfolio_PATCH,
  portfolio_POST,
  portfolio_GET,
};
