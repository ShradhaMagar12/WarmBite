const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const volunteers = sequelize.define(
    'volunteers',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  volunteers.associate = (db) => {

    db.volunteers.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.volunteers.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return volunteers;
};

