const models = require("@models");
const { createPath } = require("../file/createPath");

const createFile = async (req, res, next) => {
  if (req?.files) {
    const files = Object.keys(req.files);

    for (const file of files) {
      const data = await models.media.findOne({
        where: { md5: req.files[file].md5 },
      });
      const path = createPath(req.files[file].md5);

      req.files[file].mv(path);
      if (data?.md5 !== req.files[file].md5) {
        const image = await models.media.create({ ...req.files[file], path });
        req.mediaId = image.id;
      } else {
        req.mediaId = data.id;
      }
    }
  }

  next();
};

module.exports = { createFile };
