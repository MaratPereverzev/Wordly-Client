const models = require("@models");
const { defInclude, checkFields, excludeFields } = require("@utils");

const post = (req, res) => {
  const data = req.body;

  models.user.create(data).defAnswer(res);
};

const put = (req, res) => {
  const { id } = req.query;

  models.user.update(req.body, { where: { id } }).defAnswer(res);
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
  router.put(
    "/",
    checkFields(
      excludeFields(defInclude(["login", "password"]), ["id"]),
      "body"
    ),
    put
  );
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
