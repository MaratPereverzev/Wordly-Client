require("module-alias/register");
require("@config");
const fileUpload = require("express-fileupload");
const express = require("express");
const { bindControllers } = require("@controller");
const { dictionary } = require("@models");

const app = express();

app.use(express.json());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

bindControllers(app);

app.listen(8080, () => {
  console.log("listening on PORT :8080");
});
