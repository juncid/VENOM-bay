const Item = require("../../../server/models/item");
const User = require("../../../server/models/user");
const {ObjectId} = require("mongodb");
const faker = require("faker");
const jwt = require("jsonwebtoken");
require("dotenv").config({
  path: "../../../../.env.server"
});
const {JWT_SECRET} = process.env;

const seedItems = [
  {
    title: "Test item 1",
    _id: new ObjectId()
  },
  {
    title: "Test item 2",
    _id: new ObjectId()
  }
];

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const seedUsers = [
  {
    _id: userOneId,
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    token: jwt.sign({_id: userOneId}, JWT_SECRET.toString()),
    role: "admin"
  },
  {
    _id: userTwoId,
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
];

const populateItems = async () => {
  await Item.deleteMany();
  await Item.insertMany(seedItems);
};

const populateUsers = async () => {
  await User.deleteMany();
  await new User(seedUsers[0]).save();
  await new User(seedUsers[1]).save();
};

module.exports = {
  seedItems,
  populateItems,
  seedUsers,
  populateUsers
};
