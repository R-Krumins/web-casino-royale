const express = require("express");
require("dotenv").config();
const stocksRouter = require("./routes/stocks");

//.env variables
const PORT = process.env.PORT;

const app = express();

//middleware
//TODO: move to ./middleware
app.use(express.urlencoded({ extended: false }));

//routing
app.use("/api/stocks", stocksRouter);
app.get("/", (req, res) => {
  res.send("HEllO?!? UWU");
});

//start server
app.listen(PORT, () => console.log(`PORT IS LISTENING ON ${PORT}...`));
