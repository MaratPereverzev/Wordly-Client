const models = require("@models");
const { jwtCreate } = require("@utils");
const { jwtPassword } = require("@config");
const bcrypt = require("bcrypt");

const get = async (req, res) => {
  const { login, password } = req.query;

  const findUser = await models.user.findOne({ where: { login } });
  if (!findUser) {
    res.status(401).send({
      message: "Incorrect login or password",
    });
    return;
  }

  const isValid = await bcrypt.compare(password, findUser.password);
  if (!isValid) {
    res.status(401).send({
      message: "Incorrect login or password",
    });
    return;
  }

  res.setHeader(
    "authorization",
    jwtCreate({ login: findUser.login, password }, jwtPassword)
  );

  res.send({
    isAuth: true,
    accessToken: jwtCreate({ login: findUser.login, password }, jwtPassword),
    userLogin: findUser.login,
  });
};

module.exports = (router) => {
  router.get("/", get);
};
