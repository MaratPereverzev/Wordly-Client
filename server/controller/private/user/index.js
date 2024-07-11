const models = require("@models");
const bcrypt = require("bcrypt");
const { defInclude, checkFields, excludeFields } = require("@utils");

const post = async (req, res) => {
  const data = req.body;

  data.password = await bcrypt.hash(data.password, 10);
  models.user.create(data).defAnswer(res);
};

const put = async (req, res) => {
  const { id } = req.query;
  const { password, ...bodyParams } = req.body;

  const findUser = await models.user.findOne({ where: { id } });

  if (await bcrypt.compare(password, findUser.password)) {
    findUser.update(bodyParams).defAnswer(res);
  } else {
    findUser
      .update({
        ...bodyParams,
        password: await bcrypt.hash(req.body.password, 10),
      })
      .defAnswer(res);
  }
};

const del = (req, res) => {
  const { id } = req.query;

  if (id && (req?.userData.isAdmin || req?.userData.isSuperAdmin))
    models.user.destroy({ where: { id } }).then(() => res.send("DELETED"));
  else {
    throw new Error("YOU AREN'T AN ADMIN BRO");
  }
};

module.exports = (router) => {
  router.put("/", put);
  router.post(
    "/",
    checkFields(
      excludeFields(defInclude(["login", "password"]), ["id"]),
      "body"
    ),
    post
  );

  router.delete("/", del);
};
