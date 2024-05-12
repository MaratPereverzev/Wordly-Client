const jwt = require("jsonwebtoken");
const { user } = require("@models");

const { jwtPassword } = require("@config/config.json") || "123321";

const jwtCreate = (data) => {
  return jwt.sign(data, jwtPassword, { noTimestamp: true });
};

const jwtValidate = async (req, res, next) => {
  const { authorization } = req.query;

  const tokenData = jwt.verify(authorization, jwtPassword);

  const userData = await user.findOne({ where: tokenData });

  if (userData !== null) {
    req.userData = userData;
    next();
  } else {
    console.log("ACCESS DENIED");
  }
};

module.exports = { jwtCreate, jwtValidate };
