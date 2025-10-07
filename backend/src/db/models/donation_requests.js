const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const donation_requests = sequelize.define(
    'donation_requests',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

donation_type: {
        type: DataTypes.ENUM,

        values: [

"Food",

"Clothes",

"Other"

        ],

      },

meal_type: {
        type: DataTypes.TEXT,

      },

quantity: {
        type: DataTypes.INTEGER,

      },

status: {
        type: DataTypes.ENUM,

        values: [

"Pending",

"Accepted",

"Rejected",

"Completed"

        ],

      },

pickup: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,

      },

location: {
        type: DataTypes.TEXT,

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

  donation_requests.associate = (db) => {

    db.donation_requests.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.donation_requests.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return donation_requests;
};

