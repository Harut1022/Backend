import { DataTypes, STRING } from "sequelize";
import { sequelize } from "../db/config.js";

const User = sequelize.define("User",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:DataTypes.STRING,
    surname:DataTypes.STRING,
    salary:{
        type:DataTypes.INTEGER,
        defaultValue: 68

    },
    age:DataTypes.INTEGER

})

export default User