import { Socket } from "socket.io";

const { User } = require("../models/userModel");
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
};

const createPlayer = (socket: Socket, name: string, id: string): Player => {
  return {
    name,
    id,
    currentSimDate: new Date("2017-01-01"),
    simSpeed: 0,
    runningIntervalID: undefined,
    socket,
  };
};

async function simUpdate({ socket, id, currentSimDate, simSpeed }: Player) {
  //log.debug("SIM UPDATE");
  if (simSpeed === 0) return;

  const date = format(currentSimDate, "yyyy-MM-dd");
  const update = await User.findPortfolioOnDate(id, currentSimDate);
  socket.emit("update", { date: date, update: update });
}

export default (socket: Socket, name: string, id: string) => {
  function init() {
    const player = createPlayer(socket, name, id);
    log.info(player.name + " has started sim");

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
      player.currentSimDate = addDays(player.currentSimDate, 1);
    }, TICK_SPEED);
  }

  init();
};
