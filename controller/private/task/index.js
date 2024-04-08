const get = (req, res) => {
  res.send("ok");
};

module.exports = (router) => {
  router.get("/", get);
};
