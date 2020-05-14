const User = require("../server/models/user");
const faker = require("faker");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "..", ".env.server")
});

const {EMAIL_ADMIN, PASSWORD_ADMIN} = process.env;

const users = [
  {
    name: faker.name.firstName(),
    email: EMAIL_ADMIN,
    password: PASSWORD_ADMIN,
    role: "admin"
  },
  {
    name: faker.name.firstName(),
    email: "user_test@vbay.me",
    password: "Test1305"
  }
];

exports.users = async () => {
  await User.deleteMany();
  await new User(users[0].save());
  await new User(users[1].save());
};
