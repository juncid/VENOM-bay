const Item = require("../../../server/models/item");

const seedItems = [
  {
    title: "Test item 1"
  },
  {
    title: "Test item 2"
  }
];

const populateItems = async () => {
  await Item.deleteMany();
  await Item.insertMany(seedItems);
};

module.exports = {
  seedItems,
  populateItems
};
