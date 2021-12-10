// Author : Rounak
const express = require('express')
const app = express()

app.use(express.json())

//Cross origin Resource Sharing -> Will do something about it soon
const cors = require("cors")
app.use(cors())


//MongoDB connection
const mongooseConnection = require("./app/api/config/dbconfig").connection
mongooseConnection.on("open", () => {
    console.log("Database Connected ... ")
})


//my Controllers
const userController = require("./app/controllers/users")


app.get("/", (req, res) => {
    res.send("HELLO NODEJS")
})

app.post("/register" , userController.create)
app.get("/register" , userController.showAll)
app.post("/authenticate", userController.authenticate)





//my Port number
const port = process.env.PORT || 3000


//Listening to port
app.listen(port, () => {
    console.log(`Listening to PORT ${port} .... `)
})