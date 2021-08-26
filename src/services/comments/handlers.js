import db from "../../db/models/db_assoc.js"
import s from "sequelize"
const { Op } = s

const Category = db.Category
const Comments = db.Comments

// const getAll
// const getSingle
const create = async (req, res, next) => {
    try { 
      const data = await Comments.create(req.body)
      console.log(data)
      res.send(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
// const update
// const deleteSingle


const comment = {
    create: create
}

export default comment