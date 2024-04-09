const get = (req, res) => {
  res.send("public/task/get");
};
const post = (req, res) => {
  res.send("public/task/post");
};
const del = (req, res) => {
  res.send("public/task/delete");
};

module.exports = (router) => {
  router.get("/", get);
  router.post("/", post);
  router.delete("/", del);
};
