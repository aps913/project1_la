"use strict";
module.exports = function(sequelize, DataTypes) {
  var Progress = sequelize.define("Progress", {
    maleUSCitizen: DataTypes.INTEGER,
    maleForeignCitizen: DataTypes.INTEGER,
    femaleUSCitizen: DataTypes.INTEGER,
    femaleForeignCitizen: DataTypes.INTEGER,
    maleDebtLaborBond: DataTypes.INTEGER,
    maleForcedLabor: DataTypes.INTEGER,
    maleSexTrafficked: DataTypes.INTEGER,
    femaleDebtLaborBond: DataTypes.INTEGER,
    femaleForcedLabor: DataTypes.INTEGER,
    femaleSexTrafficked: DataTypes.INTEGER,
    malesMultiple: DataTypes.INTEGER,
    femalesMultiple: DataTypes.INTEGER,
    newClients: DataTypes.INTEGER,
    dropoutClients: DataTypes.INTEGER,
    leftClients: DataTypes.INTEGER,
    completedClients: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Progress;
};