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
    .then((data) => {
      res.send(data.toJSON());
    });
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
    .then((data) => res.send(data.toJSON()));
};

const post = (req, res) => {
  const data = req.body;

  models.user.create(data).then((data) => res.send(data.toJSON()));
};

const put = (req, res) => {};

const del = () => {};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
  router.put("/", put);
  router.post(
    "/",
    checkFields(excludeFields(defInclude(["login", "password"]), ["id"])),
    post
  );
  router.delete("/", del);
};
