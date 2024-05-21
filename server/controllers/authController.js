const { User } = require("../models/userModel");
const log = require("../lib/logger")();
const jwt = require("jsonwebtoken");

const MAX_TOKEN_AGE = 3 * 24 * 60 * 60;

function handleLoginErrors(err) {
  log.debug(err);

  const errorsMsg = { msg: "Server Error" };

  // invalid credentials
  if (err.message === "Wrong username or password") {
    errorsMsg.msg = err.msg;
  }

  return { msg: err.message };
}

function handleSignupErrors(err) {
  log.debug(err);

  let errorsMsg = { username: "", password: "" };

  // duplicate error code
  if (err.code === 11000) {
    errorsMsg.username = "Username already taken";
    return errorsMsg;
  }

  // validation errors
  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errorsMsg[properties.path] = properties.message;
    });
  }

  return errorsMsg;
}

function createToken(id) {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: MAX_TOKEN_AGE,
  });
}

module.exports.signupGet = (req, res) => {
  res.send("singup get");
};

module.exports.signupPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password, porfolio: [] });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_TOKEN_AGE * 1000 });
    log.info(`New user created: ${username}`);
    res.status(200).json({ username, userId: user._id });
  } catch (err) {
    const errors = handleSignupErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.loginGet = (req, res) => {
  res.send("login get");
};

module.exports.loginPost = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: MAX_TOKEN_AGE * 1000 });
    res.status(200).json({ username, user: user._id });
    log.info(`${username} signed in`);
  } catch (err) {
    const errors = handleLoginErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send("logged out");
};
