const models = require("@models");
const { jwtCreate, checkFields } = require("@utils");
const { jwtPassword } = require("@config");
const bcrypt = require("bcrypt");

const get = async (req, res) => {
  const { login, password } = req.body;

  const findUser = await models.user.findOne({ where: { login } });
  if (findUser) {
    res.status(401).send("This login is already exsists");
    return;
  }

  if (login.length === 0) {
    res.send("Your login must contain at least 1 character");
    return;
  } else if (password.length < 5) {
    res.send("Your password must contain at least 6 symbols");
    return;
  }

  const createUser = await models.user.create({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10),
  });

  res.setHeader(
    "Authorization",
    jwtCreate({ login: createUser.login, password }, jwtPassword)
  );

  res.send({
    isAuth: true,
    accessToken: jwtCreate({ login: createUser.login, password }, jwtPassword),
    userLogin: createUser.login,
  });
};

module.exports = (router) => {
  router.get("/", get);
};
