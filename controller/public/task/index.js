const get = (req, res) => {
  res.send("public/task/get");
};

module.exports = (router) => {
  router.get("/", get);
};
