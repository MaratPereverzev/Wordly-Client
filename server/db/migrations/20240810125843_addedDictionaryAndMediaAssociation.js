const Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable() => "media", deps: []
 * createTable() => "users", deps: []
 * createTable() => "dictionaries", deps: [media, users]
 * createTable() => "words", deps: [dictionaries]
 *
 */

const info = {
  revision: 1,
  name: "addedDictionaryAndMediaAssociation",
  created: "2024-08-10T12:58:43.477Z",
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
        mimetype: { type: Sequelize.TEXT, field: "mimetype" },
        md5: { type: Sequelize.TEXT, field: "md5" },
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
    fn: "createTable",
    params: [
      "users",
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
        login: { type: Sequelize.STRING, field: "login" },
        password: { type: Sequelize.STRING, field: "password" },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          field: "isAdmin",
          defaultValue: false,
        },
        isSuperAdmin: {
          type: Sequelize.BOOLEAN,
          field: "isSuperAdmin",
          defaultValue: false,
        },
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
    fn: "createTable",
    params: [
      "dictionaries",
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
        mediaId: {
          type: Sequelize.INTEGER,
          field: "mediaId",
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: { model: "media", key: "id" },
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          field: "userId",
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          references: { model: "users", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
  {
    fn: "createTable",
    params: [
      "words",
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
        dictionaryId: {
          type: Sequelize.INTEGER,
          field: "dictionaryId",
          onUpdate: "NO ACTION",
          onDelete: "CASCADE",
          references: { model: "dictionaries", key: "id" },
          allowNull: true,
        },
      },
      { transaction },
    ],
  },
];

const rollbackCommands = (transaction) => [
  {
    fn: "dropTable",
    params: ["dictionaries", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["media", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["users", { transaction }],
  },
  {
    fn: "dropTable",
    params: ["words", { transaction }],
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
