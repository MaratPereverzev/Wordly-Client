const { DataTypes } = require("sequelize");

module.exports = (db, modelName, options) => {
  const model = db.define(
    modelName,
    {
      caption: DataTypes.TEXT,
      description: DataTypes.TEXT,
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isSuperAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      test: DataTypes.BOOLEAN,
    },
    options
  );

  model.associate = (models) => {
    model.hasMany(models.dictionary, {
      onDelete: "NO ACTION",
      onUpdate: "NO ACTION",
    });
  };

  return model;
};
