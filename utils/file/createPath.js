const fs = require("fs");

const createPath = (path) => {
  const saveFolder = "./media";

  if (!fs.existsSync(saveFolder)) {
    fs.mkdirSync(saveFolder);
  }

  return `${saveFolder}/${path}`;
};

module.exports = { createPath };
