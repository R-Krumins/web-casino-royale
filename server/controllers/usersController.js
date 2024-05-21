const { User } = require("../models/userModel");

//TODO: add auth
async function getUser(req, res) {
  const { username } = req.params;
  console.log(username);

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
}

module.exports = {
  getUser,
};
