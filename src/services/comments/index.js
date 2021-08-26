import express from "express"
import db from "../../db/models/db_assoc.js"
import comment from "./handlers.js"

const Comments = db.Comments
const Product = db.Product
const User = db.User
import s from "sequelize"
const { Op } = s

const router = express.Router()

router
  .route("/")
  .get(comment.getAll)

router
  .route("/:userId/:productId")
    .post(comment.create)

router
  .route("/:id")
  .get(comment.getSingle)
  .put(comment.update)
  .delete(comment.deleteSingle)

export default router
