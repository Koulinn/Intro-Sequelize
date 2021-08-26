import db from "../../db/models/db_assoc.js"
import s from "sequelize"

const Category = db.Category
const Product = db.Product
const User = db.User
const Cart = db.Cart

const { Op } = s

const getAll = async (req, res, next) => {
    try {
      const data = await Cart.findAll()

      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  const getSingle = async (req, res, next) => {
    try {
      const data = await Product.findByPk(req.params.id, {
        include: [Category, {model:Comments, include: User}]
      })
      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  const addProduct = async (req, res, next) => {
    try {
      const {userId, productId } = req.params
      const data = await Cart.create({userId, productId})
      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  const update = async (req, res, next) => {
    try {
      const data = await Product.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      })
      res.send(data[1][0])
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  const deleteSingle = async (req, res, next) => {
    try {
      const {userId, productId } = req.params
      const rows = await Cart.destroy({
        where: {
          userId,
          productId
        },
      })
      if (rows > 0) {
        res.status(204).send()
      } else {
        res.status(404).send("not found")
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  
  
  const cart = {
    addProduct: addProduct,
    getAll: getAll,
    getSingle: getSingle,
    update:update,
    deleteSingle: deleteSingle
  }
  
  export default cart