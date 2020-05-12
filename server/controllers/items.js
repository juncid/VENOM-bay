const Item = require("../models/item");

exports.list = (req, res) => {
  res.send({ message: "It works!" });
};

exports.create = async (req, res) => {
  const item = new Item(req.body);
  try {
    const doc = await item.save();
    res.send({ item: doc });
  } catch (e) {
    res.status(400).send();
  }
};
