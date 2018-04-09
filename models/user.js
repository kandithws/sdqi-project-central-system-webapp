'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name_prefix: DataTypes.STRING,
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: { 
      type: DataTypes.STRING, 
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_login: DataTypes.DATE,
    address: DataTypes.STRING,
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driving_license_number: DataTypes.STRING,
    driving_license_image_path: DataTypes.STRING,
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false 
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    // OnDelete: 'CASCADE' = Dependet destroy
    User.hasMany(models.Car, {onDelete: 'CASCADE'} ) // usage, user.getCars()
  };
  return User;
};