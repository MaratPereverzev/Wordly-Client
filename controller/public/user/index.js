const { user } = require("@models");
const { Op } = require("sequelize");

const get = (req, res) => {
  const { caption, limit, offset } = req.query;

  const where = caption ? { caption: { [Op.getLike()]: caption } } : {};

  user.findAll({ where: where, limit, offset }).then((data) => {
    res.send(data.map((item) => item.toJSON()));
  });
};

const getById = (req, res) => {
  const { id } = req.params;

  user.findOne({ where: { id } }).then((data) => res.send(data.toJSON()));
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
};
