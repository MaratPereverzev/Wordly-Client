const fs = require("fs");
const path = require("path");

const readDirSync = (dir, callback) => {
  const options = { withFileTypes: true };

  const dirList = [],
    fileList = [];

  fs.readdirSync(dir, options).forEach((item) => {
    if (item.isFile()) fileList.push(path.resolve(item.path, item.name));
    else if (item.isDirectory())
      dirList.push(path.resolve(item.path, item.name));
  });

  if (typeof callback === "function") callback(dir, dirList, fileList);

  dirList.forEach((item) => readDirSync(item, callback));
};

module.exports = { readDirSync };
