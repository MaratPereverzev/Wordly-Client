const models = require("@models");
const {
  getLikeTemplate,
  defInclude,
  checkFields,
  excludeFields,
} = require("@utils");

const queryExclude = ["authorization"];

const get = (req, res) => {
  const { login, password } = req?.userData;

  const where = Object.keys(req.query).length
    ? getLikeTemplate(
        { ...req.query, ...{ login, password } },
        ["caption", "description"],
        queryExclude
      )
    : { login, password };

  models.user
    .findOne({
      where: where,
      attributes: req?.userData?.isAdmin
        ? req.userData._options.attributes
        : defInclude(["login"]),
      include: [
        {
          model: models.dictionary,
          attributes: defInclude(),
        },
      ],
    })
    .defAnswer(res);
};

const getById = (req, res) => {
  const { id } = req.params;

  models.user
    .findOne({
      where: { id },
      attributes: req?.userData?.isAdmin
        ? req.userData._options.attributes
        : defInclude(["login"]),
      include: [{ model: models.dictionary, attributes: defInclude() }],
    })
    .defAnswer(res);
};

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
    throw new Error("error");
  }
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
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
