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
    tempFileDir: "/temp/",
  })
);

bindControllers(app);

app.listen(8080, () => {
  console.log("listening on PORT :8080");
});

/*
dictionary
  .findAll()
  .then((data) => console.log(data.map((item) => item.toJSON())));
  */
//dictionary.create({ caption: "dictionary1", description: "spanish/japanese" });
