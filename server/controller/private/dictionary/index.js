const models = require("@models");
const {
  defInclude,
  checkFields,
  excludeFields,
  getLikeTemplate,
  createFile,
} = require("@utils");

const get = (req, res) => {
  const { offset, limit, ...queryParams } = req.query;

  const where = getLikeTemplate(queryParams, defInclude());

  where.userId = req.userData?.id;

  models.dictionary
    .findAndCountAll({
      where,
      limit,
      offset,
      attributes: defInclude(),
      include: [
        {
          model: models.media,
          attributes: defInclude(["path"]),
        },
      ],
    })
    .defAnswer(res);
};

const getById = (req, res) => {
  const { id } = req.params;

  models.dictionary
    .findOne({
      where: { id },
      attributes: defInclude(),
      include: [
        {
          model: models.media,
          attributes: defInclude(["path"]),
        },
      ],
    })
    .defAnswer(res);
};

const post = async (req, res) => {
  const data = req.body;
  data.userId = req.userData.id;

  if (req?.mediaId) {
    data.mediaId = (
      await models.media.findOne({ where: { id: req.mediaId } })
    ).id;
  }

  models.dictionary.create(data).defAnswer(res);
};

const put = (req, res) => {
  const { id } = req.query;

  models.dictionary.update(req.body, { where: { id } }).defAnswer(res);
};

const del = (req, res) => {
  const { id } = req.query;

  if (id && (req?.userData.isAdmin || req?.userData.isSuperAdmin))
    models.dictionary
      .destroy({ where: { id } })
      .then(() => res.send("DELETED"));
  else {
    throw new Error("error");
  }
};

module.exports = (router) => {
  router.get("/", get);
  router.get("/:id", getById);
  router.put(
    "/",
    checkFields(excludeFields(defInclude(), ["id"]), "body"),
    put
  );
  router.post(
    "/",
    checkFields(excludeFields(defInclude(), ["id"]), "body"),
    createFile,
    post
  );
  router.delete("/", del);
};
