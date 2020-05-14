const seed = require("./seed");
const moongose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env.server")
});

const { MONGO_DB_URI, MONGO_DB_NAME } = process.env;

moongose.connect(`${MONGO_DB_URI}/${MONGO_DB_NAME}`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

(async () => {
  try {
    await seed.users();
    console.log("Successfully seeded user accounts");
    process.exit(0);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
