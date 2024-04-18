const { user, word } = require("@models");
const { getLikeTemplate } = require("@utils");
const { Op, HasMany } = require("sequelize");

const queryExclude = ["authorization"];

const get = (req, res) => {
  const where = Object.keys(req.query).length
    ? getLikeTemplate(req.query, ["caption"], queryExclude)
    : {};
  /*
  word
    .findAndCountAll({
      include: [
        {
          association: new HasMany(word, user, {
            sourceKey: "userId",
            foreignKey: "id",
          }),
        },
      ],
      where,
    })
    .then((data) => res.send(data.rows.map((item) => item.toJSON())));
    */
  user
    .findAll({
      where: where,
      include: { model: word },
    })
    .then((data) => {
      res.send(data);
    });
};

const getById = (req, res) => {
  const { id } = req.params;

  user.findOne({ where: { id } }).then((data) => res.send(data.toJSON()));
};

const post = (req, res) => {
  const data = req.body;
  user.create(data).then((data) => res.send(data.toJSON()));
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
  router.post("/", post);
};

/*
  const wordInstance = await word.findOne({ where: { id: 1 } });
  user.findOne({ where: { id: 1 }, include: word }).then((data) => {
    data.addWord(wordInstance);
    res.send(data.toJSON());
  });
*/
