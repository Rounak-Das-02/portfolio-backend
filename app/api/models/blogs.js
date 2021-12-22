const mongoose = require("mongoose")
const connections = require("../config/dbconfig")

const blogsSchema = mongoose.Schema({
    author_id : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
    },
    title : {type : String, required: true},
    slug : {type : String, default : "No Information Available, to view the blog , click on Read More or See More Blogs"},
    link : {type : String, required : true},
    date : {type : Date, default : Date()},
    
})

module.exports = connections["conn1"].model("Blogs", blogsSchema)

