require("module-alias/register");
require("@config");
const fileUpload = require("express-fileupload");
const express = require("express");
const { bindControllers } = require("@controller");
const { dictionary, word, user } = require("@models");
const { jwtCreate } = require("@utils");

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
word
  .create({ caption: "hola", description: "hello", dictionaryId: 1 })
  .then((data) => console.log(data));
  */
/*
dictionary
  .create({ caption: "dictionarySpanish", description: "spanish", userId: 1 })
  .then((data) => console.log(data));
  */
//console.log(jwtCreate({ login: "Marat", password: "123321" }, "password"));
/*
user
  .create({
    caption: "Marat",
    description: "okay",
    login: "Marat",
    password: "123321",
  })
  .then((data) => console.log(data));
*/
//word.create({ caption: "ok", description: "test" });
/*
dictionary
  .create({ caption: "ok", description: "okok" })
  .then((data) => console.log(data.map((item) => item.toJSON())));
*/
//dictionary.create({ caption: "dictionary1", description: "spanish/japanese" });
