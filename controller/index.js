const express = require("express");
const { loadPrivateControllers } = require("./private");
const { loadPublicControllers } = require("./public");

const app = express();

loadPrivateControllers.forEach((item) => {
  app.use(`/api/private/${item.controllerName}`, item.router);
});

loadPublicControllers.forEach((item) => {
  app.use(`/api/${item.controllerName}`, item.router);
});

app.listen(8080, () => {
  console.log("listening on port :8080");
});
