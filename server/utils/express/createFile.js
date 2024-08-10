const models = require("@models");
const { createPath } = require("../file/createPath");

const createFile = async (req, res, next) => {
  const files = Object.keys(req.files);

  for (const file of files) {
    const data = await models.media.findOne({
      where: { md5: req.files[file].md5 },
    });

    req.files[file].mv(`${createPath(req.files[file].md5)}`);
    if (data?.md5 !== req.files[file].md5) {
      models.media.create({ ...req.files[file] }).then((data) => {
        req.mediaId = data.id;
      });
    } else {
      req.mediaId = data.id;
    }
  }

  next();
};

module.exports = { createFile };
