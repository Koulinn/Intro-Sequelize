import express from "express"
import db from "../../db/models/db_assoc.js"

const User = db.User
const Comments = db.Comments
import s from "sequelize"
const { Op } = s

const router = express.Router()

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await User.findAll({
        include: Comments,
      })

      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

  .post(async (req, res, next) => {
    try {
      console.log('post User ')
      const data = await User.create(req.body)
      console.log(data)
      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await User.findByPk(req.params.id, {
        include: Comments,
      })
      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await User.update(req.body, {
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
      const rows = await User.destroy({
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
