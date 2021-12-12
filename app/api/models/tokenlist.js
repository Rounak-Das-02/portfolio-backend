const mongoose = require("mongoose")
const connections = require("../config/dbconfig")

const tokenListSchema = mongoose.Schema({
    tokenId : {
        type : String,
        required : true
    },
    author_id : {
        type : mongoose.Types.ObjectId,
        required : true,
    }, 
    author_name : {
        type : String, 
        required : true,
    },
    black : {
        type : Boolean,
        required : true,
        default : false
    },
    date_created : {
        type : Date,
        required : true,
        default : Date.now()
    }
})

module.exports = connections.conn2.model("blacklist", tokenListSchema)

