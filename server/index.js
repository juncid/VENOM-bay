const express = require("express");
const app = express();
const path = require("path");
const validator = require("validator");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env.server")
});

// Configure database
const DB_URI = process.env.DB_URI;
const DB_PORT = process.env.DB_PORT;
const DB_NAME_TEST = process.env.DB_NAME_TEST;
const NODE_ENV = process.env.NODE_ENV;
const DB_NAME = NODE_ENV === "test" ? DB_NAME_TEST : process.env.DB_NAME;
const URI_MONGO = `mongodb://${DB_URI}:${DB_PORT}/${DB_NAME}`;
const mongoose = require("mongoose");

mongoose.connect(URI_MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

// Configure body-parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Configure routes
app.use("/items", require("./routes/items"));

// Start Server
const port = process.env.PORT;

if (NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
}

module.exports = app;
