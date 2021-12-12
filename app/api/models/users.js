const mongoose = require("mongoose")
const connections = require("../config/dbconfig")

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        trim: true,
        required: true,
    },
    password:{
        type:String,
        trim: true,
        required : true,
    }
})

module.exports = connections["conn1"].model("User", userSchema)