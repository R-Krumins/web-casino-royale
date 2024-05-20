const winston = require("winston");
const caller = require("caller");

const { combine, timestamp, printf, label, colorize } = winston.format;

// GLOBALS
const LOG_FILE = "./logs/log.log";
const FILE_LOG_LEVEL = process.env.FILE_LOG_LEVEL;
const CONSOLE_LOG_LEVEL = process.env.CONSOLE_LOG_LEVEL;

console.log(FILE_LOG_LEVEL, CONSOLE_LOG_LEVEL);

/*--LOG LEVELS---
    error: 0
    warn: 1
    info: 2
    http: 3
    verbose: 4
    debug: 5
    silly: 6
--------------*/

// FORMATS
const consoleFormat = printf(({ level, message, label }) => {
  return `[${label}] ${level}: ${message}`;
});

const fileFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// TRANSPORTS
const consoleTransport = new winston.transports.Console({
  level: CONSOLE_LOG_LEVEL,
  format: combine(colorize(), consoleFormat),
});

const fileTransport = new winston.transports.File({
  level: FILE_LOG_LEVEL,
  filename: LOG_FILE,
  format: combine(timestamp(), fileFormat),
});

// CREATE LOGGER
function createLogger(_name) {
  // if name is not provided, creaete it from caller file name
  const name = _name || caller().replace(/^.*[\\/]/, "");

  return winston.createLogger({
    transports: [consoleTransport, fileTransport],
    format: combine(label({ label: name })),
    //winston logs errors twice for some reason
    // exceptionHandlers: [consoleTransport, fileTransport],
    exitOnError: false,
  });
}

module.exports = createLogger;
