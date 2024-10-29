const models = require("@models");
const {
  defInclude,
  getLikeTemplate,
  excludeFields,
  defAnswer,
} = require("@utils");

const get = (req, res) => {
  const { limit, offset, ...queryParams } = req.query;

  const where = Object.keys(queryParams).length
    ? getLikeTemplate({ ...queryParams }, ["caption"])
    : {};
  models.word
    .findAndCountAll({ where, attributes: defInclude() })
    .defAnswer(res);
};

const getById = (req, res) => {
  const { id } = req.params;

  models.word
    .findOne({
      where: { id },
      attributes: defInclude(),
      include: [
        {
          model: models.dictionary,
          attributes: excludeFields(defInclude(), ["id"]),
        },
      ],
    })
    .defAnswer(res);
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
};
