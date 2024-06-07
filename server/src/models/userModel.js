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
  const ass = "66551dc43fc93c192fa1dda5";
  const fuck = "2018-08-03";

  return this.aggregate([
    // TODO: dont't create a new ObjectID everytime this function is called!
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    { $project: { portfolio: 1 } },
    { $unwind: "$portfolio" },
    {
      $lookup: {
        from: "stocks",
        localField: "portfolio.id",
        foreignField: "_id",
        as: "stocks",
      },
    },
    { $unwind: "$stocks" },
    { $unwind: "$stocks.data" },
    { $match: { "stocks.data.date": date } },
    {
      $project: {
        _id: 0,
        symbol: "$portfolio.id",
        amount: "$portfolio.amount",
        open: "$stocks.data.open",
        high: "$stocks.data.high",
        low: "$stocks.data.low",
        close: "$stocks.data.close",
        adjclose: "$stocks.data.adjclose",
        volume: "$stocks.data.volume",
      },
    },
  ]);
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
