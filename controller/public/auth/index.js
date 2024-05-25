const models = require("@models");
const { jwtCreate } = require("@utils");
const bcrypt = require("bcrypt");

const get = async (req, res) => {
  const { login, password } = req.body;

  const findUser = await models.user.findOne({ where: { login } });
  if (!findUser) {
    res.status(401).send("Incorrent login or password");
    return;
  }

  const isValid = await bcrypt.compare(password, findUser.password);
  if (!isValid) {
    res.status(401).send("Incorrect login or password");
    return;
  }

  res.setHeader(
    "Authorization",
    jwtCreate({ login: findUser.login, password })
  );

  res.send("ok");
};

module.exports = (router) => {
  router.get("/", get);
};
