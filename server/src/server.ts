import dotenv from "dotenv";
dotenv.config();

import express from "express";
const http = require("http");
const stocksRouter = require("./routes/stocksRouter");
const userRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");
const cors = require("cors");
import { Server } from "socket.io";
import mongoose from "mongoose";
import simHandler from "./socket/simHandler";
import { isStringObject } from "util/types";
const log = require("./lib/logger")();
const cookieParser = require("cookie-parser");
const path = require("path");

//.env variables
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL || "";

//server setup
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
  },
});

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./public"));

//routing
app.use("/api/stocks", stocksRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

//scoket.io
io.on("connection", (socket) => {
  log.info(`User Connected: ${socket.id}`);

  const { username, id } = socket.handshake.query as {
    username: string;
    id: string;
  };
  console.log(username, id);

  if (username && id) {
    simHandler(socket, username, id);
  } else {
    console.log("FUCK");
  }
});

//attempt db connection and start server
mongoose
  .connect(DB_URL)
  .then(() => {
    server.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}...`));
  })
  .catch((error) => {
    throw new Error(error);
  });
