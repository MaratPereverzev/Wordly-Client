const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * removeColumn(userId) => "words"
 * createTable() => "userWord", deps: [users, words]
 *
 */

const info = {
  revision: 7,
  name: "addedRelationManyToManyBetweenUserAndWord",
  created: "2024-04-16T19:11:29.594Z",
  comment: "",
};

const migrationCommands = (transaction) => [
  {
    fn: "removeColumn",
    params: ["words", "userId", { transaction }],
  },
  {
    fn: "createTable",
    params: [
      "userWord",
      {
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
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: { model: "users", key: "id" },
          primaryKey: true,
        },
        wordId: {
          type: Sequelize.INTEGER,
          field: "wordId",
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: { model: "words", key: "id" },
          primaryKey: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["userWord", { transaction }],
  },
  {
    fn: "addColumn",
    params: [
      "words",
      "userId",
      {
        type: Sequelize.INTEGER,
        field: "userId",
        onUpdate: "NO ACTION",
        onDelete: "NO ACTION",
        references: { model: "users", key: "id" },
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
