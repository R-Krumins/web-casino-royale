const { User } = require("../models/User");

//TODO: add auth
async function getUser(req, res) {
  const { userName } = req.params;

  const user = await User.findOne({ userName: userName });
  console.log(user.get("userName"));

  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
}

async function createUser(req, res) {
  const { userName, passwHash, portfolio } = req.body;

  try {
    const user = await User.create({ userName, passwHash, portfolio });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getUser,
  createUser,
};
