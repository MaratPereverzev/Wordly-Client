const models = require("@models");

const userFieldsExclude = [
  "id",
  "password",
  "createdAt",
  "deletedAt",
  "updatedAt",
];

const get = (req, res) => {
  const { limit, offset, ...queryParams } = req.query;

  const where = Object.keys(queryParams).length
    ? getLikeTemplate({ ...queryParams }, ["caption"], queryExclude)
    : {};

  models.user
    .findAll({
      where: where,
      include: models.dictionary,
      limit,
      offset,
      attributes: userFieldsExclude,
    })
    .then((data) => {
      res.send(data.map((item) => item.toJSON()));
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  models.user
    .findOne({ where: { id } })
    .then((data) => res.send(data.toJSON()));
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
};
