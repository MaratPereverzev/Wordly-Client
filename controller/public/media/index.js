const models = require("@models");
const fs = require("fs");
const zlib = require("zlib");

const get = (req, res) => {
  const { md5 } = req.query;

  if (!md5) {
    res.status(406).send("Requires file's md5");
    return;
  }

  models.media
    .findOne({ where: { md5 } })
    .then((data) => {
      const headers = {
        "Accept-ranges": "bytes",
        "Content-Type": "image/jpeg",
        "Content-Length": data.size,
        "Content-Range": `0-*/${data.size}`,
      };
      const filePipe = fs.createReadStream(`./testAPI/${data.md5}`);

      res.set(headers);
      if (!!req.acceptsEncoding("gzip")) {
        res.setHeader("Content-Encoding", "gzip");
        filePipe.pipe(zlib.createGzip()).pipe(res);
      } else if (!!req.acceptsEncoding("deflate")) {
        res.setHeader("Content-Encoding", "deflate");
        filePipe.pipe(zlib.createDeflate()).pipe(res);
      } else if (!!req.acceptsEncoding("br")) {
        res.setHeader("Content-Encoding", "brotli");
        filePipe.pipe(zlib.createBrotliCompress()).pipe(res);
      } else {
        filePipe.pipe(res);
      }
    })
    .catch((err) => {
      res.status(401).send("NOT FOUND");
    });
};

module.exports = (router) => {
  router.get("/", get);
};
