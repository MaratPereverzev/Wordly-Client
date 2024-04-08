const get = (req, res) => {
  console.log("hi");
};

module.exports = (router) => {
  router.get("/", get);
};
