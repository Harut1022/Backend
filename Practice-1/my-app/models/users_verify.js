'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersVerify extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UsersVerify.belongsTo(models.User,{foreignKey:"userId", as:"User"})
    }
  }
  UsersVerify.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    userId: DataTypes.INTEGER,
    atempt: DataTypes.INTEGER,
    isBlock: DataTypes.INTEGER,
    time: DataTypes.DATE,
    verify_key: DataTypes.STRING,
    verified: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsersVerify',
  });
  return UsersVerify;
};