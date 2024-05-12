const models = require("@models");
const {
  getLikeTemplate,
  checkFields,
  excludeFields,
  defInclude,
} = require("@utils");

const queryExclude = ["authorization"];

const get = (req, res) => {
  models.dictionary
    .findAll({ where: { userId: req.userData.id }, include: models.word })
    .then((dictionaries) => {
      const wordsList = [];

      dictionaries.forEach((dict) =>
        dict.words.forEach((word) => wordsList.push(word))
      );
      res.send(wordsList);
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  word.findOne({ where: { id } }).then((data) => res.send(data.toJSON()));
};

const post = (req, res) => {
  const data = req.body;
  word.create(data).defAnswer(res);
};

const put = (req, res) => {
  const { id } = req.query;
  const data = req.body;

  word.update(data, { where: { id } }).then((data) => res.send(data));
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
  router.get("/", get);
  router.get("/:id", getById);
  router.post(
    "/",
    checkFields(
      excludeFields(defInclude(["login", "password"]), ["id"]),
      "body"
    ),
    post
  );
  router.put(
    "/",
    checkFields(
      excludeFields(defInclude(["login", "password"]), ["id"]),
      "body"
    ),
    put
  );
  router.delete("/", del);
};
