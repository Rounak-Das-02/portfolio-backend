const Blog = require("../api/models/blogs")

const createBlog = async (req, res) => {
    try{

        const findAuthor = await Blog.findOneAndUpdate({
            author_id : req.body.id
        },
        {
            "$push" : { blogs : {link: req.body.link, date : req.body.req}},
            // $setOnInsert: { author_id: req.body.id } // $set is necessary, otherwise it's gonna overwrite the entire document
        },
        {
            upsert : true
        },
        );
        
        res.status(200).json({status: "success", message: "Blog added Successfully!!!", data: null});
    }catch(err){
        console.log(err)
        res.status(400).json({status: "failure", message: "Blog Could not be Added!!!", data: null});
    }
}


const showAllBlogs = async (req, res) => {
    try{
        const allBlogs = await Blog.find()
        res.json(allBlogs)
    }catch(err){
        res.status(400).json({status: "failure", message: "Blogs Could not be fetched !!!", data: null});
    }
}


//Delete Blog is not Working right now, Need to Debug ... 
const deleteBlog = async (req, res) => {
    try{
        // await Blog.deleteOne({_id : req.params.id})

        const findAuthor = await Blog.findOneAndUpdate({
            _id : req.body.id
        },
        {
            "$pull" : {"blogs" : {_id : req.params.id} },
            // $setOnInsert: { author_id: req.body.id } // $set is necessary, otherwise it's gonna overwrite the entire document
        },
        );

        res.status(200).json({status: "success", message: "Blog deleted Successfully!!!", data: null});
    }catch(err){
        console.log(err)
        res.status(400).json({status: "failure", message: "Blog Could not be Deleted!!!", data: null});
    }
}



const getBlogById = async (req, res) => {
    try{
        await Blog.deleteOne({_id : req.params.id})
        res.status(400).json({status: "success", message: "Blog deleted Successfully!!!", data: null});
    }catch(err){
        res.status(400).json({status: "failure", message: "Blog Could not be Deleted!!!", data: null});
    }
}


module.exports = {createBlog, showAllBlogs, deleteBlog, getBlogById}