const { User } = require("../models/userModel");
const { Stock } = require("../models/stockModel");
const { format, addDays } = require("date-fns");
const log = require("../lib/logger")();
const cache = require("./portfolioCache");

const TICK_SPEED = 1000 / process.env.SIM_TICKS_PER_SECOND;

async function simUpdate(socket, user, date, simSpeed) {
  if (simSpeed === 0) return;
  const portfolio = cache.getPortfolio(user.id);
  // portfolio can be null if player suddenly disconects and cache entry is cleared
  if (!portfolio) return;
  const stocks = portfolio.map((x) => x.id);
  const update = await Stock.findManyByDate(stocks, date);

  // add amount to each stock
  update.forEach(
    (x) => (x.amount = portfolio.find((y) => y.id === x._id).amount)
  );

  socket.emit("update", { date: date, update: update });
}

module.exports = (io, socket, user) => {
  function init() {
    const name = user.username;
    log.info(name + " has started sim");
    cache.registerNewUser(user.id);
    let simDate = new Date("2017-01-01");
    let simSpeed = 0;
    let intervalID; // id returned by setInterval()

    socket.on("change-speed", (speed) => {
      log.debug(`${name} changed SIM SPEED to ${speed}`);
      simSpeed = speed;
    });

    socket.on("disconnect", () => {
      cache.removeUser(user.id);
      clearInterval(intervalID);
    });

    // MAIN GAME LOOP
    intervalID = setInterval(() => {
      simUpdate(socket, user, format(simDate, "yyyy-MM-dd"), simSpeed);
      simDate = addDays(simDate, 1);
    }, TICK_SPEED);
  }

  init();
};
