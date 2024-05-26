const models = require("@models");
const { defInclude, checkFields, excludeFields } = require("@utils");

const post = (req, res) => {
  const data = req.body;

  models.dictionary.create(data).defAnswer(res);
};

const put = (req, res) => {
  const { id } = req.query;

  models.dictionary.update(req.body, { where: { id } }).defAnswer(res);
};

const del = (req, res) => {
  const { id } = req.query;

  if (id && (req?.userData.isAdmin || req?.userData.isSuperAdmin))
    models.dictionary
      .destroy({ where: { id } })
      .then(() => res.send("DELETED"));
  else {
    throw new Error("error");
  }
};

module.exports = (router) => {
  router.put(
    "/",
    checkFields(excludeFields(defInclude(), ["id"]), "body"),
    put
  );
  router.post(
    "/",
    checkFields(excludeFields(defInclude(), ["id"]), "body"),
    post
  );
  router.delete("/", del);
};
