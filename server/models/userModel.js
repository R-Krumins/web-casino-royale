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

// login method
userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });

  console.log(username);

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) return user;
  }

  throw Error("Wrong username or password");
};

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
