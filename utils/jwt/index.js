const jwt = require("jsonwebtoken");
const { user } = require("@models");
const bcrypt = require("bcrypt");
const { jwtPassword } = require("@config/config.json") || "123321";

const jwtCreate = (data) => {
  return jwt.sign(data, jwtPassword, { noTimestamp: true });
};

const jwtValidate = async (req, res, next) => {
  const { authorization } = req.headers;
  const { password, ...tokenData } = jwt.verify(authorization, jwtPassword);

  const userData = await user.findOne({ where: tokenData });
  if (!userData) {
    res.send("ACCESS DENIED");
    return;
  }

  const isValid = await bcrypt.compare(password, userData.password);
  if (!isValid) {
    res.send("ACCESS DENIED");
    return;
  }

  req.userData = userData;
  next();
};

module.exports = { jwtCreate, jwtValidate };
