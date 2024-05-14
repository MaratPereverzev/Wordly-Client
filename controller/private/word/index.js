const models = require("@models");
const { checkFields, excludeFields, defInclude } = require("@utils");

const post = (req, res) => {
  const data = req.body;
  models.word.create(data).defAnswer(res);
};

const put = (req, res) => {
  const { id } = req.query;
  const data = req.body;

  models.word.update(data, { where: { id } }).then((data) => res.send(data));
};

const del = (req, res) => {
  const { id } = req.query;

  if (id && (req?.userData.isAdmin || req?.userData.isSuperAdmin))
    models.word.destroy({ where: { id } }).then(() => res.send("DELETED"));
  else {
    throw new Error("error");
  }
};

module.exports = (router) => {
  router.post(
    "/",
    checkFields(excludeFields(defInclude(), ["id"]), "body"),
    post
  );
  router.put(
    "/",
    checkFields(excludeFields(defInclude(), ["id"]), "body"),
    put
  );
  router.delete("/", checkFields(["id"]), del);
};
