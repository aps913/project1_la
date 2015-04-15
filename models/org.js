var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

module.exports = function(sequelize, DataTypes) {
  var Org = sequelize.define("Org", {
    username:  { 
      type: DataTypes.STRING, 
      unique: true, 
      validate: {
        len: [6, 30], // <--- validates length
      }
    },
    passwordDigest: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true // <--- validates presence
      }
    },
    orgName: DataTypes.STRING,
    contactPerson: DataTypes.STRING,
    email: DataTypes.STRING,
    

    //add column in sequelize
    //ProgressId needs to exist within the child table
  }, {
    instanceMethods: {
      checkPassword: function(password) {
        return bcrypt.compareSync(password, this.passwordDigest);
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // TRYING TO MAKE ASSOCIATIONS
        //**** NOT WORKING YET *****
        this.hasMany(models.Progress);
      },
      encryptPassword: function(password) {
        var hash = bcrypt.hashSync(password, salt);
        return hash;
      },
      createSecure: function(username, password) {
        if(password.length < 6) {
          throw new Error("Password too short");
        }
        return this.create({
          username: username,
          passwordDigest: this.encryptPassword(password)
        });

      },
      authenticate: function(username, password) {
        // find a user in the DB
        return this.find({
          where: {
            username: username
          }
        }) 
        .then(function(user){
          if (user === null){
            throw new Error("Username does not exist");
          }
          else if (user.checkPassword(password)){
            return user;
          } else {
            return false;
          }

        });
      }

    } // close classMethods
  }); // close define user
  return Org;
};