const defInclude = (extraFields = []) => {
  const defFieldsInclude = ["id", "caption", "description"];

  if (!Array.isArray(extraFields))
    throw new Error("extraFields isn't an array");
  extraFields.forEach((item, index) => {
    if (!typeof item === "string")
      throw new Error(
        `extraFields do have incorrect type of fields: typeof extraFields[${index}] = ${typeof item}`
      );
    defFieldsInclude.push(item);
  });

  return defFieldsInclude;
};

const excludeFields = (fields, excludeFields) => {
  if (!Array.isArray(fields))
    throw new Error(
      `typeof 'fields' isn't an array (${typeof fields} instead)`
    );

  return fields.filter((item) => !excludeFields.includes(item));
};
module.exports = { defInclude, excludeFields };
