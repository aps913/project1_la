"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Orgs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING
      },
      passwordDigest: {
        type: DataTypes.STRING
      },
      orgName: {
        type: DataTypes.STRING
      },
      contactPerson: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Orgs").done(done);
  }
};