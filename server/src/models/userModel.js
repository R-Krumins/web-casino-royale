const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const portfolioSchema = new Schema(
  {
    id: { type: String, required: true },
    amount: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
    match: [
      /^[a-zA-Z0-9 _-]*$/,
      "Username can contain: letters, numbers, underscore or hyphen",
    ],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password lenght is 6 characters"],
  },
  portfolio: { type: [portfolioSchema], required: true },
  liquidCash: { type: Number, default: 10_000 },
});

// password hasher
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// STATICS
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  console.log(username);

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
  }

  throw Error("Wrong username or password");
};

// big ass aggregation query that gets the price info of every item
// in users portfolio on a specific date
userSchema.statics.findPortfolioOnDate = function (userId, date) {
  // TODO: dont't create a new ObjectID everytime this function is called!
  return this.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    { $project: { _id: 0, portfolio: 1 } },
    { $unwind: "$portfolio" },
    {
      $lookup: {
        from: "stockData",
        localField: "portfolio.id",
        foreignField: "symbol",
        as: "stocks",
      },
    },
    { $unwind: "$stocks" },
    { $match: { "stocks.date": date } },
    {
      $project: {
        symbol: "$portfolio.id",
        amount: "$portfolio.amount",
        open: "$stocks.open",
        high: "$stocks.high",
        low: "$stocks.low",
        close: "$stocks.close",
        adjclose: "$stocks.adjclose",
        volume: "$stocks.volume",
      },
    },
  ]);
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
