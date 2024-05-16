const { DataTypes } = require("sequelize");

module.exports = (db, modelName, options) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
    },
    options
  );

  model.associate = (models) => {
    model.hasMany(models.word, {
      onDelete: "CASCADE",
      onUpdate: "NO ACTION",
    });
  };

  return model;
};
