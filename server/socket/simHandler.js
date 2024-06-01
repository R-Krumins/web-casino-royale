const { User } = require("../models/userModel");
const { format, addDays } = require("date-fns");
const log = require("../lib/logger")();

const TICK_SPEED = 1000 / process.env.SIM_TICKS_PER_SECOND;

async function simUpdate(socket, user, date, simSpeed) {
  if (simSpeed === 0) return;
  const update = await User.findPortfolioOnDate(user.id, date);
  socket.emit("update", { date: date, update: update });
}

module.exports = (io, socket, user) => {
  function init() {
    log.info(user.username + " has started sim");
    let simDate = new Date("2017-01-01");
    let simSpeed = 0;
    let intervalID; // id returned by setInterval()q

    socket.on("change-speed", (speed) => {
      log.debug(`${user.username} changed SIM SPEED to ${speed}`);
      simSpeed = speed;
    });

    socket.on("disconnect", () => {
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
