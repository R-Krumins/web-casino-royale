const { User } = require("../models/userModel");

//TODO: add auth
async function getUser(req, res) {
  const { username } = req.params;

  const user = await User.findOne({ username: username });
  console.log(user.get("userName"));

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
}

async function createUser(req, res) {
  const { username, password, portfolio } = req.body;

  try {
    const user = await User.create({ username, password, portfolio });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getUser,
  createUser,
};
