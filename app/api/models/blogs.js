const mongoose = require("mongoose")

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

module.exports = mongoose.model("Blogs", blogsSchema)

