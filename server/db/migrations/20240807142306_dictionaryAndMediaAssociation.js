const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(dictionaryId) => "media"
 * addColumn(mediumId) => "dictionaries"
 *
 */

const info = {
  revision: 7,
  name: "dictionaryAndMediaAssociation",
  created: "2024-08-07T14:23:06.681Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["media", "dictionaryId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "dictionaries",
      "mediumId",
      {
        type: Sequelize.INTEGER,
        field: "mediumId",
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
        references: { model: "media", key: "id" },
        allowNull: true,
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["dictionaries", "mediumId", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "media",
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
