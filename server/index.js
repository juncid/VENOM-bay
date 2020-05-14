const express = require("express");
const app = express();
const path = require("path");
const validator = require("validator");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env.server")
});
const { MONGO_DB_URI,
  MONGO_DB_NAME_TEST,
  MONGO_DB_NAME,
  NODE_ENV,
  PORT
} = process.env;

// Configure database
const DB_NAME = NODE_ENV === "test" ? MONGO_DB_NAME_TEST : MONGO_DB_NAME;
const URI_MONGO = `${MONGO_DB_URI}/${DB_NAME}`;
const mongoose = require("mongoose");

mongoose.connect(URI_MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));

// Configure body-parser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Configure routes
app.use("/items", require("./routes/items"));
app.use("/users", require("./routes/users"));

// Start Server

if (NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = app;
