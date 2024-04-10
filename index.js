require("module-alias/register");
require("@config");
const express = require("express");
const { bindControllers } = require("@controller");
const { task } = require("@models");
const app = express();

bindControllers(app);

console.log(task);

app.listen(8080, () => {
  console.log("listening on PORT :8080");
});
