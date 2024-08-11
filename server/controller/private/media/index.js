const models = require("@models");
const { checkFields, createPath, createFile } = require("@utils");

const post = (req, res) => {
  const { id } = req.body;
  models.media.findOne({ where: { id: req.mediaId ?? id } }).defAnswer(res);
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
  router.post("/", createFile, post);
  router.delete("/", checkFields(["id"]), del);
};
