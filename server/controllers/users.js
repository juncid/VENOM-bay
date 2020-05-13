const Users = require("../models/user");

exports.create = async (req, res) => {
  const { name, email, password } = req.body;
  const user = new Users({ name, email, password });

  try {
    const doc = await user.save();
    const token = await doc.generateAuthToken();
    res
      .header("authorization", `Bearer ${token}`)
      .send({user: doc});
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.read = async (req, res) => {
  res.send({user: req.user});
};
