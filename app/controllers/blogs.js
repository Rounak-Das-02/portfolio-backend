const Blog = require("../api/models/blogs")

const createBlog = async (req, res) => {
    try{
        const findAuthor = new Blog({
            author_id : req.user["id"],
            title : req.body.title,
            slug : req.body.slug,
            link : req.body.link,
            date : req.body.date,
        },
    )

        const b1 = await findAuthor.save()
        
        res.status(200).json({status: "success", message: "Blog added Successfully!!!", data: b1});
    }catch(err){
        console.log(err)
        res.status(400).json({status: "failure", message: "Blog Could not be Added!!!", data: null});
    }
}


const showAllBlogs = async (req, res, next) => {
    try{
        const allBlogs = await Blog.find()
        res.json(allBlogs)
    }catch(err){
        res.status(400).json({status: "failure", message: "Blogs Could not be fetched !!!", data: null});
    }
}


//Update : Delete Blog  is Working !! ... 
const deleteBlog = async (req, res) => {
    try{
        const findAuthor = await Blog.remove({
            "_id" : req.body.blog_id
        })

        res.status(200).json({status: "success", message: "Blog deleted Successfully!!!", data: null});
    }catch(err){
        console.log(err)
        res.status(400).json({status: "failure", message: "Blog Could not be Deleted!!!", data: null});
    }
}



const getBlogById = async (req, res) => {
    try{
        const b1 = await Blog.findOne({
            _id : req.params.id,
        });
        console.log(b1)
        
        if(b1==null) return res.status(400).json({status: "failure", message: "Blog Could not be Found!!!", data: null});

        res.status(200).json({status: "success", message: "Blog found !!!", data: b1});
    }catch(err){
        console.log(err)
        res.status(400).json({status: "failure", message: "Blog Could not be Found!!!", data: null});
    }
}


const showFewBlogs = async (req, res, next) => {
    try{
        const allBlogs = await Blog.find().limit(parseInt(req.params.number))
        res.json(allBlogs)
    }catch(err){
        res.status(400).json({status: "failure", message: "Blogs Could not be fetched !!!", data: null});
    }
}

module.exports = {createBlog, showAllBlogs, deleteBlog, getBlogById, showFewBlogs}