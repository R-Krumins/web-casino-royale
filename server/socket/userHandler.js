const { User } = require("../models/userModel");
const { Stock } = require("../models/stockModel");
const { format, addDays } = require("date-fns");
const log = require("../lib/logger")();
const cache = require("./portfolioCache");

const TICK_SPEED = 1000 / process.env.SIM_TICKS_PER_SECOND;

module.exports = (io, socket, user) => {
  async function getPorfolio(userID, date) {
    const portfolio = cache.getPortfolio(userID);
    if (portfolio === null) {
      log.error(`player's ${userID} portfolio is NULL!!!`);
      return;
    }

    const update = await Promise.all(
      portfolio.map(async (item) => {
        const retrieved = await Stock.findOne(
          { _id: item.id, "data.date": date },
          { "data.$": 1 },
          { lean: true }
        );

        if (!retrieved) return null;
        return { ...item, ...retrieved.data[0] };
      })
    );

    socket.volatile.emit("update", { date: date, update: update });
  }

  function init() {
    const name = user.username;
    log.info(name + " has started sim");
    cache.registerNewUser(user.id);
    let simDate = new Date("2017-01-01");
    let simSpeed = 0;

    socket.on("change-speed", (speed) => {
      log.debug(`${name} changed SIM SPEED to ${speed}`);
      simSpeed = speed;
    });

    socket.on("disconnect", () => {
      cache.removeUser(user.id);
    });

    // MAIN GAME LOOP
    setInterval(() => {
      if (simSpeed === 0) return;
      getPorfolio(user.id, format(simDate, "yyyy-MM-dd"));
      simDate = addDays(simDate, 1);
    }, TICK_SPEED);
  }

  init();
};
