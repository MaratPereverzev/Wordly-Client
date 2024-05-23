const models = require("@models");
const fs = require("fs");
const zlib = require("zlib");

const get = (req, res) => {
  const { name, where } = req.query;

  models.media
    .findOne({ where: { name } })
    .then((data) => {
      const headers = {
        "Accept-ranges": "bytes",
        "Content-Encoding": "deflate",
        "Content-Type": "image/jpeg",
        "Content-Length": data.size,
        "Content-Range": `0-*/${data.size}`,
      };

      const filePipe = fs.createReadStream(`./testAPI/${data.md5}`);
      res.set(headers);
      filePipe.pipe(zlib.createDeflate()).pipe(res);
    })
    .catch((err) => {
      res.status(401).send("NOT FOUND");
    });
};

module.exports = (router) => {
  router.get("/", get);
};
