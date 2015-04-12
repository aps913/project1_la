"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Progresses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      maleUSCitizen: {
        type: DataTypes.INTEGER
      },
      maleForeignCitizen: {
        type: DataTypes.INTEGER
      },
      femaleUSCitizen: {
        type: DataTypes.INTEGER
      },
      femaleForeignCitizen: {
        type: DataTypes.INTEGER
      },
      maleDebtLaborBond: {
        type: DataTypes.INTEGER
      },
      maleForcedLabor: {
        type: DataTypes.INTEGER
      },
      maleSexTrafficked: {
        type: DataTypes.INTEGER
      },
      femaleDebtLaborBond: {
        type: DataTypes.INTEGER
      },
      femaleForcedLabor: {
        type: DataTypes.INTEGER
      },
      femaleSexTrafficked: {
        type: DataTypes.INTEGER
      },
      malesMultiple: {
        type: DataTypes.INTEGER
      },
      femalesMultiple: {
        type: DataTypes.INTEGER
      },
      newClients: {
        type: DataTypes.INTEGER
      },
      dropoutClients: {
        type: DataTypes.INTEGER
      },
      leftClients: {
        type: DataTypes.INTEGER
      },
      completedClients: {
        type: DataTypes.INTEGER
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
    migration.dropTable("Progresses").done(done);
  }
};