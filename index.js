const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")
const folderRouter = require('./routes/folder.routes')
const todoRouter = require('./routes/todo.routes')
const app = express()
const PORT = config.get("serverPort")
const corsMiddleWare = require("./middleware/cors.middleware")

app.use(corsMiddleWare)
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/folder", folderRouter)
app.use("/api/todo", todoRouter)

const start = async () => {
  try {
    mongoose.connect(config.get("dbUrl"))

    app.listen(PORT, () => (
      console.log("server started on port ", PORT)
    ))
  } catch (error) {
    console.log(error)
  }
}

start()