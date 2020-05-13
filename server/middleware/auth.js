const Users = require("../models/user");

module.exports = async (req, res, next) => {
  let token;
  try {
    token = req.header("authorization").split(" ")[1];
  } catch (e) {
    return res.status(401).send({message: "Authorization token invalid."});
  }
  try {
    req.user = await Users.findByToken(token);
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send(e);
  }
}
