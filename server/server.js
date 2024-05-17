const express = require("express");
const http = require("http");
const stocksRouter = require("./routes/stocks");
const cors = require("cors");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const userHandler = require("./handlers/userHandler");
require("dotenv").config();

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
//TODO: move to ./middleware
app.use(express.urlencoded({ extended: false }));

//routing
app.use("/api/stocks", stocksRouter);
app.get("/", (req, res) => {
  res.send("HEllO?!? UWU");
});

//scoket.io
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
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

// let i = 0;
// setInterval(() => {
//   ++i;

//   io.volatile.emit("update", i);
// }, 1000);
