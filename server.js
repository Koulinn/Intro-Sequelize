import express from "express"
import db from "./src/db/models/db_assoc.js"
import cors from "cors"
import categoryRouter from "./src/services/category/index.js"
import productRouter from "./src/services/products/index.js"

const server = express()
const { PORT } = process.env

server.use(express.json())
server.use(cors())

server.use("/category", categoryRouter)
server.use("/product", productRouter)

await db.sequelize.sync()

server.listen(PORT, () => console.log("🚀 Server is running on port ", PORT))

server.on("error", (error) =>
  console.log("🚀 Server is crashed due to ", error)
)

// const dbConn = async () => await db.sequelize
//   .sync()
//   .then(() => {
//     server.listen(PORT, () =>
//       console.log("🚀 Server is running on port ", PORT)
//     )

//     server.on("error", (error) =>
//       console.log("🚀 Server is crashed due to ", error)
//     )
//   })
//   .catch((error) => console.log(error))
