import sequelize from "../conn.js"
import Product from "./Product.js"
import Category from "./Category.js"
import User from "./User.js"
import Comments from "./Comments.js"

Product.belongsTo(Category, { foreignKey: {allowNull: false}})
Category.hasMany(Product, { foreignKey: {allowNull: false}})


Product.belongsToMany(User, {through: {model:Comments, unique: false}})
// User.belongsToMany(Product, {through: {model:Comments, unique: false}})


Comments.belongsTo(User, { foreignKey: {allowNull: false}})
User.hasMany(Comments, { foreignKey: {allowNull: false}})


Product.hasMany(Comments, { foreignKey: {allowNull: false}})
Comments.belongsTo(Product, { foreignKey: {allowNull: false}})



export default { sequelize, Product, Category, User, Comments }
