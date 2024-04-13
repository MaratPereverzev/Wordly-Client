const { word } = require("@models");
const { Op } = require("sequelize");

const get = (req, res) => {
  const { caption } = req.query;

  const where = caption ? { caption: { [Op.getLike()]: caption } } : {};

  word.findAll({ where: where }).then((data) => {
    res.send(data.map((item) => item.toJSON()));
  });
};

const getById = (req, res) => {
  const { id } = req.params;

  word.findOne({ where: { id } }).then((data) => res.send(data.toJSON()));
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
};
