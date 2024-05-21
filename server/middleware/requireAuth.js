const jwt = require("jsonwebtoken");
const log = require("../lib/logger")();
const { User } = require("../models/userModel");

async function requireAuth(req, res, next) {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const { _id } = jwt.verify(token, process.env.SECRET);
      req.user = await User.findOne({ _id }).select("_id");
      next();
      return;
    } catch (err) {
      log.warn(err);
    }
  }
  res.status(403).send({ error: "Access forbiden." });
}

module.exports = requireAuth;
