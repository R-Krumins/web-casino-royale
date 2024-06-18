import { Socket } from "socket.io";

const { User } = require("../models/userModel");
const { StockData } = require("../models/stockModel");
const { format, addDays } = require("date-fns");
const log = require("../lib/logger")();

// SIM_TICKS_PER_SECOND .env varibale
if (
  process.env.SIM_TICKS_PER_SECOND &&
  isNaN(Number(process.env.SIM_TICKS_PER_SECOND))
) {
  throw new Error(
    "Either enviroment variable SIM_TICKS_PER_SECOND is no defined or isNaN"
  );
}

const TICK_SPEED = 1000 / Number(process.env.SIM_TICKS_PER_SECOND);

type Player = {
  name: string;
  id: string; // DB id of user
  currentSimDate: Date;
  simSpeed: number;
  runningIntervalID: ReturnType<typeof setInterval> | undefined; // id returned by setInterval()
  socket: Socket;
  searchedSymbol: string | null;
};

type Update = {
  portfolio: Object[];
  liquidCash: number;
  curentDate: string;
  searched: Object | null;
};

const createPlayer = (socket: Socket, name: string, id: string): Player => {
  return {
    name,
    id,
    currentSimDate: new Date("2003-01-01"),
    simSpeed: 0,
    runningIntervalID: undefined,
    socket,
    searchedSymbol: null,
  };
};

async function simUpdate({
  socket,
  id,
  currentSimDate,
  simSpeed,
  searchedSymbol,
}: Player) {
  //log.debug("SIM UPDATE");
  if (simSpeed === 0) return;

  const portfolio = await User.findPortfolioOnDate(id, currentSimDate);

  let searched = null;
  if (searchedSymbol) {
    searched = await StockData.findOne({
      symbol: searchedSymbol,
      date: currentSimDate,
    });
  }

  const date = format(currentSimDate, "yyyy-MM-dd");
  const update: Update = {
    portfolio,
    liquidCash: 69,
    curentDate: date,
    searched,
  };

  socket.emit("update", update);
}

export default (socket: Socket, name: string, id: string) => {
  function init() {
    const player = createPlayer(socket, name, id);
    log.info(player.name + " has started sim");

    socket.on("search", (symbol: string | null) => {
      player.searchedSymbol = symbol;
    });

    socket.on("change-speed", (speed) => {
      log.debug(`${player.name} changed SIM SPEED to ${speed}`);
      player.simSpeed = speed;
    });

    socket.on("disconnect", () => {
      clearInterval(player.runningIntervalID);
    });

    // MAIN GAME LOOP
    player.runningIntervalID = setInterval(() => {
      simUpdate(player);
      player.currentSimDate.setUTCHours(24, 0, 0, 0); // FUCK DAYTIME SAVINGS
    }, TICK_SPEED);
  }

  init();
};
