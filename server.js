// Author : Rounak
const express = require('express')
const app = express()
app.use(express.json())


//Cross origin Resource Sharing -> Will do something about it soon
const cors = require("cors")
app.use(cors())


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
app.get("/", async (req, res) => {
    const result = await axios.get("https://raw.githubusercontent.com/Rounak-Das-02/blogs/master/_posts/2020-06-15-how-i-built-my-first-bot.markdown")
    res.send(marked.parse(result.data)) // Will be used in React Component later
})


// Routes
const authRouter = require("./app/api/routes/authRoute")
app.use("/auth", authRouter)

const blogRouter = require("./app/api/routes/blogRoute")
app.use("/blog", blogRouter)



//my Port number
const port = process.env.PORT || 3000


//Listening to port
app.listen(port, () => {
    console.log(`Listening to PORT ${port} .... `)
})