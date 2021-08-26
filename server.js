import express from "express"
import db from "./src/db/models/db_assoc.js"
import cors from "cors"
import categoryRouter from "./src/services/category/index.js"
import productRouter from "./src/services/products/index.js"
import lib from "./src/lib/index.js"

const {errorHandlers, serverConfig} = lib


const server = express()
const { PORT } = process.env

server.use(express.json())
server.use(cors(serverConfig))

server.use("/category", categoryRouter)
server.use("/product", productRouter)






server.use(errorHandlers.forbidden)
server.use(errorHandlers.notFound)
server.use(errorHandlers.badRequest)
server.use(errorHandlers.server)



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
