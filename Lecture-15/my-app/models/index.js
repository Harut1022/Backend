import Product from "./product.js"
import User from "./user.js"



User.hasMany(Product,{foreignKey:"userId",as:"products"})
Product.belongsTo(User,{foreignKey:"userId",as:"seller"})


export {Product,User}

