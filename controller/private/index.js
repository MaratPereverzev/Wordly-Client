const path = require("path");
const express = require("express");
const { readDirSync } = require("@utils");
const fileExt = ".js";
const basename = path.basename(__filename, fileExt);

const findFiles = [];
const loadPrivateControllers = [];

//capitalizeFirstLetterWithoutIndex
const CFLWI = (str) => {
  if (str === basename) return "";
  return str[0].toUpperCase() + str.slice(1);
};

readDirSync(__dirname, (dir, dirs, files) => {
  files
    .filter(
      (item) =>
        item.slice(-3) === fileExt &&
        (path.basename(item, fileExt) !== basename ||
          path.dirname(item.replace(__dirname + path.sep, ""), "") !== ".")
    )
    .forEach((item) => {
      findFiles.push({
        path: item,
        dirName: path.dirname(item.replace(__dirname + path.sep, ""), ""),
      });
    });
});

findFiles.forEach((item) => {
  const controllerName =
    item.dirName === "."
      ? path.basename(item.path, fileExt)
      : item.dirName
          .split(path.sep)
          .map((item, index) => (index !== 0 ? CFLWI(item) : item))
          .join("");

  const loadController = require(`${item.path}`);

  if (typeof loadController === "function") {
    const router = express.Router();

    loadController(router);

    loadPrivateControllers.push({ controllerName, router });
  }
});

console.log(
  `\x1b[34m[PRIVATE]\x1b[0m controllers: ${loadPrivateControllers
    .map((item) => item.controllerName)
    .join(", ")}`
);

module.exports = { loadPrivateControllers };
