const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "media", deps: []
 * changeColumn(dictionaryId) => "words"
 *
 */

const info = {
  revision: 3,
  name: "addMediaModel",
  created: "2024-05-22T12:46:21.672Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "createTable",
    params: [
      "media",
      {
        id: {
          type: Sequelize.INTEGER,
          field: "id",
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        caption: { type: Sequelize.TEXT, field: "caption" },
        description: { type: Sequelize.TEXT, field: "description" },
        name: { type: Sequelize.TEXT, field: "name" },
        size: { type: Sequelize.FLOAT, field: "size" },
        mimeType: { type: Sequelize.TEXT, field: "mimeType" },
        fileId: { type: Sequelize.TEXT, field: "fileId" },
        createdAt: {
          type: Sequelize.DATE,
          field: "createdAt",
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          field: "updatedAt",
          allowNull: false,
        },
        deletedAt: { type: Sequelize.DATE, field: "deletedAt" },
      },
      { transaction },
    ],
  },
  {
    fn: "changeColumn",
    params: [
      "words",
      "dictionaryId",
      {
        type: Sequelize.INTEGER,
        field: "dictionaryId",
        onUpdate: "NO ACTION",
        onDelete: "CASCADE",
        references: { model: "dictionaries", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["media", { transaction }],
  },
  {
    fn: "changeColumn",
    params: [
      "words",
      "dictionaryId",
      {
        type: Sequelize.INTEGER,
        field: "dictionaryId",
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
        references: { model: "dictionaries", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const pos = 0;
const useTransaction = true;

const execute = (queryInterface, sequelize, _commands) => {
  let index = pos;
  const run = (transaction) => {
    const commands = _commands(transaction);
    return new Promise((resolve, reject) => {
      const next = () => {
        if (index < commands.length) {
          const command = commands[index];
          console.log(`[#${index}] execute: ${command.fn}`);
          index++;
          queryInterface[command.fn](...command.params).then(next, reject);
        } else resolve();
      };
      next();
    });
  };
  if (useTransaction) return queryInterface.sequelize.transaction(run);
  return run(null);
};

module.exports = {
  pos,
  useTransaction,
  up: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, migrationCommands),
  down: (queryInterface, sequelize) =>
    execute(queryInterface, sequelize, rollbackCommands),
  info,
};
