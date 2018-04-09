'use strict';
module.exports = (sequelize, DataTypes) => {
  var Car = sequelize.define('Car', {
    license_plate_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : { // Unique for first implementation, many to many later
        args: true,
        msg: 'This License plate number is already registered to the system'
      }
    },
    brand: DataTypes.STRING,
    model_name: DataTypes.STRING,
    model_year: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});
  Car.associate = function(models) {
    // associations can be defined here
    Car.belongsTo(models.User, {as: 'User', foreignKey: 'user_id' }) // getUser(), setUser() -- we need to match foreignKey with Migrations (Schema)
  };
  return Car;
};