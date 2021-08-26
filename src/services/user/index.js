import express from "express"
import user from "./handlers.js"

const router = express.Router()

router
  .route("/")
  .get(user.getAll)

  .post(user.create)

router
  .route("/:id")
  .get(user.getSingle)
  .put(user.update)
  .delete(user.deleteSingle)

export default router
