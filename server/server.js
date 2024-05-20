require("dotenv").config();
const express = require("express");
const http = require("http");
const stocksRouter = require("./routes/stocks");
const userRouter = require("./routes/users");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const userHandler = require("./handlers/userHandler");
const log = require("./lib/logger")();

//.env variables
const PORT = process.env.PORT;

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

//routing
app.use("/api/stocks", stocksRouter);
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("HEllO?!? UWU");
});

//scoket.io
io.on("connection", (socket) => {
  log.info(`User Connected: ${socket.id}`);
  userHandler(io, socket);
});

//attempt db connection and start server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    server.listen(PORT, () => console.log(`LISTENING ON PORT ${PORT}...`));
  })
  .catch((error) => {
    throw new Error(error);
  });
