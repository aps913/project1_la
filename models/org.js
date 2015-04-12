"use strict";
module.exports = function(sequelize, DataTypes) {
  var Org = sequelize.define("Org", {
    username: DataTypes.STRING,
    passwordDigest: DataTypes.STRING,
    orgName: DataTypes.STRING,
    contactPerson: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Org;
};