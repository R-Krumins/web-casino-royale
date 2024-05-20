const { User } = require("../models/userModel");
const { Stock } = require("../models/stockModel");
const { format, addDays } = require("date-fns");
const log = require("../lib/logger")();

module.exports = (io, socket) => {
  async function getPorfolio(userName, date) {
    const user = await User.findOne({ userName: userName });

    const update = await Promise.all(
      user.portfolio.map(async (item) => {
        return await Stock.findOne(
          { _id: item.id, "data.date": date },
          { "data.$": 1 }
        );
      })
    );

    socket.volatile.emit("update", { date: date, update: update });
  }

  function init() {
    const name = "Bobby";
    let simDate = new Date("2017-01-01");
    let simSpeed = 0;

    log.info(`${name} started SIM PLAY`);

    setInterval(() => {
      if (simSpeed === 0) return;
      getPorfolio("Bobby", format(simDate, "yyyy-MM-dd"));
      simDate = addDays(simDate, 1);
    }, 1000);

    socket.on("change-speed", (speed) => {
      log.debug(`${name} changed SIM SPEED to ${speed}`);
      simSpeed = speed;
    });
  }

  socket.on("init", init);
};
