const Users = require("../models/user");

exports.create = async (req, res) => {
  const user = new Users(req.body);

  try {
    const doc = await user.save();
    const token = await doc.generateAuthToken();
    res
      .header("authorization", `Bearer ${token}`)
      .send({user: doc});
  } catch (e) {
    res.status(400).send(e);
  }
}
