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
    completedClients: DataTypes.INTEGER,
    orgId: DataTypes.INTEGER
    //remove column orgID
  }, {
    classMethods: {
      associate: function(models) {
        // Trying to make associations
        // **** NOT WORKING YET *****
        this.belongsTo(models.Org);// associations can be defined here
      }
    }
  });
  return Progress;
};