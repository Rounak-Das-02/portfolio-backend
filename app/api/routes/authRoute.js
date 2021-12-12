const express = require("express")
const authRouter = express.Router()

const userController = require("../../controllers/users")
const verify = require("../../controllers/verifyToken")


authRouter.post("/register" , userController.create)
authRouter.post("/authenticate", userController.authenticate)
authRouter.get("/show" , verify, userController.showAll)
authRouter.post("/logout", verify, userController.logout)
authRouter.post("/logAllout", verify, userController.logAllOut)
authRouter.post("/tokens", verify, userController.ShowAllTokens)


module.exports = authRouter