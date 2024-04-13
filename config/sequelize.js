const env = process.env.NODE_ENV || "development";
const configDB = require("./config.json")[env];
const { Op } = require("sequelize");

Op.getLike = function () {
  if (configDB.dialect === "postgres") {
    return this.iLike;
  }
  return this.like;
};
