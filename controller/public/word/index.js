const models = require("@models");
const { defInclude, getLikeTemplate, defAnswer } = require("@utils");

const get = (req, res) => {
  const { userId, limit, offset, ...queryParams } = req.query;

  const where = Object.keys(queryParams).length
    ? getLikeTemplate({ ...queryParams }, ["caption"])
    : {};

  if (userId) {
    models.dictionary
      .findAll({ where: { userId } })
      .then((dictionaries) =>
        models.word.findAll({
          where: {
            dictionaryId: dictionaries.map((dict) => dict.id),
            ...where,
          },
          include: [{ model: models.dictionary, attributes: defInclude() }],
          attributes: defInclude(),
        })
      )
      .defAnswer(res);
  } else {
    models.word.findAll({ where }).defAnswer(res);
  }
};

const getById = (req, res) => {
  const { id } = req.params;

  models.word
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
