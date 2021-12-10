const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const saltRounds = 10

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

module.exports = mongoose.model("User", userSchema)