"use strict";
require("module-alias/register");
const path = require("path");
const fileExt = ".js";
const { readDirSync } = require("@utils");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename, "js");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.json")[env];

const db = {};
const defOptions = { paranoid: true };

const findFiles = [];

//capitalizeFirstLetterWithoutIndex
const CFLWI = (str) => {
  if (str === basename) return "";
  return str[0].toUpperCase() + str.slice(1);
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  { dialect: "postgres", logging: false }
);

readDirSync(__dirname, (dir, dirs, files) => {
  const findFiles = files.filter(
    (item) =>
      item.slice(-3) === ".js" &&
      (path.dirname(item.replace(__dirname + path.sep, "")) !== "." ||
        path.basename(item, fileExt) !== basename)
  );
  findFiles.forEach((item) => {
    const dirName = path.dirname(item.replace(__dirname + path.sep, ""));

    const modelName =
      dirName === "."
        ? path.basename(item, fileExt)
        : dirName
            .split(path.sep)
            .map((item, index) => (index !== 0 ? CFLWI(item) : item))
            .join("");

    const model = require(item);

    if (typeof model === "function") {
      const loadModel = model(sequelize, modelName, defOptions);

      if (loadModel) db[modelName] = loadModel;
    }
  });
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
