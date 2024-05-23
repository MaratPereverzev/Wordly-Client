const models = require("@models");
const {
  defInclude,
  getLikeTemplate,
  excludeFields,
  defAnswer,
} = require("@utils");

const get = (req, res) => {
  const { userId, limit, offset, ...queryParams } = req.query;

  const where = Object.keys(queryParams).length
    ? getLikeTemplate({ ...queryParams }, ["caption"])
    : {};

  if (userId) {
    models.dictionary
      .findAll({ where: { userId }, attributes: defInclude() })
      .then((dictionaries) =>
        models.word.findAndCountAll({
          where: {
            dictionaryId: dictionaries.map((dict) => dict.id),
            ...where,
          },
          include: [
            {
              model: models.dictionary,
              attributes: excludeFields(defInclude(), ["id"]),
            },
          ],
          attributes: defInclude(),
        })
      )
      .defAnswer(res);
  } else {
    models.word
      .findAndCountAll({ where, attributes: defInclude() })
      .defAnswer(res);
  }
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
