const mongoose = require("mongoose")
const connections = require("../config/dbconfig")

const blogsSchema = mongoose.Schema({
    author_id : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
    },
    blogs : [
        {
            link : {type : String, required : true},
            date : {type : Date, default : Date.now}
        }
    ]
})

module.exports = connections["conn1"].model("Blogs", blogsSchema)

