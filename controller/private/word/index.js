const models = require("@models");
const { getLikeTemplate } = require("@utils");

const queryExclude = ["authorization"];

const get = (req, res) => {
  const { login, password } = req?.tokenData;

  const where = Object.keys(req.query).length
    ? getLikeTemplate(
        { ...req.query, ...{ login, password } },
        ["caption"],
        queryExclude
      )
    : { login, password };

  models.user
    .findOne({
      where: where,
    })
    .then((data) => {
      res.send(data.toJSON());
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
