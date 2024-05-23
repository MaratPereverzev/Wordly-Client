require("module-alias/register");
require("@config");
const fileUpload = require("express-fileupload");
const express = require("express");
const { bindControllers } = require("@controller");

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

//console.log(jwtCreate({ login: "Admin", password: "QWERTY" }, "password"));
/*
user
  .create({
    caption: "test",
    description: "DELETE ME!",
    login: "delete",
    password: "me",
  })
  .then((data) => console.log(data));
*/
