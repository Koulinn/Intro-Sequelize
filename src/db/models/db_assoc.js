import sequelize from "../conn.js"
import Product from "./Product.js"
import Category from "./Category.js"
import User from "./User.js"
import Comments from "./Comments.js"

Product.belongsTo(Category)
Category.hasMany(Product)


Product.belongsToMany(User, {through: {model:Comments, unique: false}})
// User.belongsToMany(Product, {through: {model:Comments, unique: false}})


Comments.belongsTo(User)
User.hasMany(Comments)


Product.hasMany(Comments)
Comments.belongsTo(Product)



export default { sequelize, Product, Category, User, Comments }
