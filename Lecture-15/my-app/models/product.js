import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../db/config.js";

const Product = sequelize.define("Product",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    price:DataTypes.INTEGER,
    quantity:DataTypes.INTEGER

})

export default Product 