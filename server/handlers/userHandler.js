const { User } = require("../models/User");
const { Stock } = require("../models/Stock");
const { format, addDays } = require("date-fns");

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

  function formatDate(date) {
    return;
  }

  function init() {
    console.log(`Bobby has started their sim`);
    let date = new Date("2019-01-01");

    // getPorfolio("Bobby", format(date, "yyyy/MM/dd"));

    setInterval(() => {
      getPorfolio("Bobby", format(date, "yyyy-MM-dd"));
      date = addDays(date, 1);
    }, 1000);
  }

  socket.on("init", init);
};
