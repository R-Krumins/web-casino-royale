const log = require("../lib/logger")();
const { User } = require("../models/userModel");

// db reads cost money so better reduce them
// by caching user portfolios

// userID: string => portfolio: object
const cache = new Map();

const registerNewUser = async (userID) => {
  try {
    const resp = await User.findOne(
      { _id: userID },
      { portfolio: 1 },
      { lean: true }
    );
    cache.set(userID, resp.portfolio);
    log.debug(userID + " added to cache");
  } catch (error) {
    log.error(error);
  }
};

const removeUser = (userID) => {
  if (cache.has(userID)) {
    cache.delete(userID);
    log.debug(userID + " removed from cache");
  } else {
    log.error(`ATTEMPTED TO DELETE NON EXISTENT USER ${userID}`);
  }
};

const getPortfolio = (userID) => {
  return cache.get(userID);
};

const updatePortfolio = (userID, portfolio) => {
  if (cache.has(userID)) {
    cache.set(userID, portfolio);
  } else {
    log.error(`ATTEMPTED TO UDPATE PORTFOLIO FOR NON EXISTENT USER ${userID}`);
  }
};

const getAll = () => {
  return cache;
};

module.exports = {
  registerNewUser,
  getPortfolio,
  updatePortfolio,
  removeUser,
  getAll,
};
