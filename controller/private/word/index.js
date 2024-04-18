const { word, user } = require("@models");
const { Op } = require("sequelize");

const get = (req, res) => {
  const { caption } = req.query;

  const where = caption ? { caption: { [Op.getLike()]: caption } } : {};

  word.findAll({ where: where, include: user }).then((data) => {
    res.send(data.map((item) => item.toJSON()));
  });
};

const getById = (req, res) => {
  const { id } = req.params;

  word.findOne({ where: { id } }).then((data) => res.send(data.toJSON()));
};

const post = (req, res) => {
  const data = req.body;
  word.create(data).then((data) => res.send(data.toJSON()));
};

const put = (req, res) => {
  const { id } = req.query;
  const data = req.body;

  word.update(data, { where: { id } }).then((data) => res.send(data));
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
  router.post("/", post);
  router.put("/", put);
  //router.delete("/", del);
};
