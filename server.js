// Author : Rounak
const express = require('express')
const app = express()
app.use(express.json())
var cookieParser = require('cookie-parser')
app.use(cookieParser())

//Cross origin Resource Sharing -> Nuked CORS of Express. Nginx does a better job at it.

//MongoDB connection
// const mongooseConnection = require("./app/api/config/dbconfig").connection
const mongooseConnection = require("./app/api/config/dbconfig")

// console.log(mongooseConnection["conn1"])
mongooseConnection.conn1.on("open", () => {
    console.log("Main Database Connected ... ")
})

mongooseConnection.conn2.on("open", () => {
    console.log("Token Database Connected ... ")
})

const axios = require("axios")
const marked = require("marked")
app.get("/api", async (req, res) => {
    res.send("Welcome to Nginx + React + MongoDB + NodeJS + Express + My Insanity") // Will be used in React Component later
})


// Routes
const authRouter = require("./app/api/routes/authRoute")
app.use("/api/auth", authRouter)

const blogRouter = require("./app/api/routes/blogRoute")
app.use("/api/blog", blogRouter)



//my Port number
const port = process.env.PORT || 3000


//Listening to port
app.listen(port, () => {
    console.log(`Listening to PORT ${port} .... `)
})