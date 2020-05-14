const seed = require("./seed");
const moongose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env.server")
});

const {MONGO_DB_URI, DB_NAME} = process.env;

moongose.connect(`${MONGO_DB_URI}`)
