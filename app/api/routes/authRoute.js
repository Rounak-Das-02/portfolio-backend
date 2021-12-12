const express = require("express")
const authRouter = express.Router()

const userController = require("../../controllers/users")
const verify = require("../../controllers/verifyToken")


authRouter.post("/register" , userController.create)
authRouter.get("/show" , verify, userController.showAll)
authRouter.post("/authenticate", userController.authenticate)



module.exports = authRouter