const models = require("@models");
const { checkFields, defInclude, excludeFields } = require("@utils");

const post = async (req, res) => {
  const files = Object.keys(req.files);

  for (const file of files) {
    const fileExists = await models.media.findOne({ where: { md5: file.md5 } });

    if (!fileExists) models.media.create({ ...req.files[file] }).defAnswer(res);
    req.files[file].mv(`./testAPI/${req.files[file].md5}`);
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
