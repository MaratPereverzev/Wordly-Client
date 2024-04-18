const { Op } = require("sequelize");

const getLikeTemplate = (data, fields, excludeFields) => {
  if (!typeof data === "object" || !Array.isArray(fields)) {
    throw new Error("ok");
  }

  const result = Object.keys(data).reduce((accum, item) => {
    if (fields.includes(item)) accum[item] = { [Op.getLike()]: data[item] };
    else if (excludeFields.includes(item)) return accum;
    else accum[item] = data[item];
    return accum;
  }, {});

  return result;
};

module.exports = { getLikeTemplate };
