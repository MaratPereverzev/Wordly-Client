const models = require("@models");
const { defInclude, getLikeTemplate, defAnswer } = require("@utils");

const get = (req, res) => {
  const { limit, offset, ...queryParams } = req.query;

  const where = Object.keys(queryParams).length
    ? getLikeTemplate({ ...queryParams }, ["caption"])
    : {};

  models.word
    .findAll({
      where: where,
      limit,
      offset,
      attributes: defInclude(),
      //include: models.dictionary,
    })
    .defAnswer(res);
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
