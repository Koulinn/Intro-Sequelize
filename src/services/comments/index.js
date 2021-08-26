import express from "express"
import db from "../../db/models/db_assoc.js"
import comment from "./handlers.js"

const Comments = db.Comments
const Product = db.Product
import s from "sequelize"
const { Op } = s

const router = express.Router()

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Comments.findAll({
        include: Product,
      })

      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router
  .route("/:userId/:productId")
    .post(comment.create)

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Comments.findByPk(req.params.id, {
        include: Product,
      })
      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Comments.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      })
      res.send(data[1][0])
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Comments.destroy({
        where: {
          id: req.params.id,
        },
      })
      if (rows > 0) {
        res.send("ok")
      } else {
        res.status(404).send("not found")
      }
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

export default router
