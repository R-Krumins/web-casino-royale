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
const simHandler = require("./socket/simHandler");
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
app.use(express.static("../public"));

//routing
app.use("/api/stocks", stocksRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

//scoket.io
io.on("connection", (socket) => {
  log.info(`User Connected: ${socket.id}`);

  const user = socket.handshake.query;
  if (user.id) {
    simHandler(io, socket, user);
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
