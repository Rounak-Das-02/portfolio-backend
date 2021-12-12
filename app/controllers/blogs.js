const Blog = require("../api/models/blogs")

const createBlog = async (req, res) => {
    try{
        const newBlog = new Blog({
            author_id : req.body.id,
            blog : {
                link : req.body.link,
                date : req.body.date
            }
        })
        
        const b = await newBlog.save()
        res.status(200).json({status: "success", message: "Blog added Successfully!!!", data: b});
    }catch(err){
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


const deleteBlog = async (req, res) => {
    try{
        await Blog.deleteOne({_id : req.params.id})
        res.status(400).json({status: "success", message: "Blog deleted Successfully!!!", data: null});
    }catch(err){
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