const checkFields = (requiredFields) => (req, res, next) => {
  const bodyFields = Object.keys(req.body);

  const errorFields = requiredFields.filter(
    (item) => !bodyFields.includes(item)
  );

  if (errorFields.length > 0) {
    console.warning(
      `missing fields for in \x1b[4m${
        req.baseUrl
      }\x1b[0m: [\x1b[31m${errorFields.join(", ")}\x1b[0m]`
    );
  } else {
    next();
  }
};
module.exports = { checkFields };
