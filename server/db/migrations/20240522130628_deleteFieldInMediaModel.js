const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * renameColumn(mimeType) => "media"
 * removeColumn(fileId) => "media"
 *
 */

const info = {
  revision: 4,
  name: "deleteFieldInMediaModel",
  created: "2024-05-22T13:06:28.041Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "renameColumn",
    params: ["media", "mimeType", "mimetype"],
  },
  {
    fn: "removeColumn",
    params: ["media", "fileId", { transaction }],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "renameColumn",
    params: ["media", "mimetype", "mimeType"],
  },
  {
    fn: "addColumn",
    params: [
      "media",
      "fileId",
      { type: Sequelize.TEXT, field: "fileId" },
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
