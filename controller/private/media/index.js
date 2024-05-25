const models = require("@models");
const { checkFields, createPath } = require("@utils");

const post = async (req, res) => {
  const files = Object.keys(req.files);

  for (const file of files) {
    models.media
      .findOne({
        where: { md5: req.files[file].md5 },
      })
      .then((data) => {
        req.files[file].mv(`${createPath(req.files[file].md5)}`);
        if (data.md5 !== req.files[file].md5)
          return models.media.create({ ...req.files[file] });

        return data;
      })
      .defAnswer(res);
  }
};

const del = (req, res) => {
  const { id } = req.query;

  if (req?.userData.isAdmin || req?.userData.isSuperAdmin)
    models.media.destroy({ where: { id } }).then(() => res.send("DELETED"));
  else {
    throw new Error("YOU AREN'T AN ADMIN BRO");
  }
};

module.exports = (router) => {
  router.post("/", post);
  router.delete("/", checkFields(["id"]), del);
};
