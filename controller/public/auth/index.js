const models = require("@models");
const {
  getLikeTemplate,
  defInclude,
  excludeFields,
  defAnswer,
} = require("@utils");

const get = (req, res) => {
  const { limit, offset, ...queryParams } = req.query;

  const where = Object.keys(queryParams).length
    ? getLikeTemplate(
        { ...queryParams },
        ["caption"],
        ["password", "isAdmin", "isSuperAdmin"]
      )
    : {};

  if (
    queryParams["password"] !== undefined ||
    queryParams["isAdmin"] !== undefined ||
    queryParams["isSuperAdmin"] !== undefined
  ) {
    res.status(406).send("Something went wrong");
    return;
  }
  models.user
    .findAndCountAll({
      where: where,
      limit,
      offset,
      attributes: defInclude(["login"]),
      include: [
        {
          model: models.dictionary,
          attributes: excludeFields(defInclude(), ["id"]),
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
      attributes: defInclude(),
      include: [{ model: models.dictionary, attributes: defInclude() }],
    })
    .defAnswer(res);
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
};
