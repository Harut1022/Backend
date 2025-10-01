'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, {foreignKey:"userId",as:"products"})
    }
  }
  User.init({
    id:{
      primaryKey:true,
      type:DataTypes.INTEGER,
      autoIncrement:true,
    },
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    salary: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    tableName:"users"
  });
  return User;
};