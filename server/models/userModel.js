const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: { type: String, required: true },
  passwHash: { type: String, required: true },
  portfolio: [
    {
      id: { type: String, required: true },
      amount: { type: Number, required: true, default: 0 },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
