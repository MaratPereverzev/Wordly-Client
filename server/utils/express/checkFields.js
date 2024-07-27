const checkFields =
  (requiredFields, queryType = "query") =>
  (req, res, next) => {
    const bodyFields = Object.keys(req[queryType]);

    const errorFields = requiredFields.filter(
      (item) => !bodyFields.includes(item)
    );

    if (errorFields.length > 0) {
      console.warning(
        `missing fields for \x1b[4m${
          req.baseUrl
        }\x1b[0m: [\x1b[31m${errorFields.join(", ")}\x1b[0m]`
      );
      return;
    } else {
      next();
    }
  };
module.exports = { checkFields };
