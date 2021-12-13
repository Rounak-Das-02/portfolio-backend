const Blog = require("../api/models/blogs")

const createBlog = async (req, res) => {
    try{

        const findAuthor = await Blog.findOneAndUpdate({
            author_id : req.body.author_id
        },
        {
            "$push" : { blogs : {link: req.body.link, date : req.body.req}},
        },
        {
            upsert : true
        });
        
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


//Update : Delete Blog  is Working !! ... 
const deleteBlog = async (req, res) => {
    try{
        const findAuthor = await Blog.updateMany({
            "author_id" : req.body.author_id
        },
        {
            "$pull" : {blogs : {_id:  req.params.id}},
        },
        {
            upsert : false,
            multi : true
        }
        );
        console.log(findAuthor)

        res.status(200).json({status: "success", message: "Blog deleted Successfully!!!", data: null});
    }catch(err){
        console.log(err)
        res.status(400).json({status: "failure", message: "Blog Could not be Deleted!!!", data: null});
    }
}



const getBlogById = async (req, res) => {
    try{
        const b1 = await Blog.findOne({
            author_id : req.body.author_id,
        });

        const a1 = b1.blogs.find((document) => {
            if (document._id == req.params.id)
                return (document)
        })
        res.status(200).json({status: "success", message: "Blog found !!!", data: a1});
    }catch(err){
        console.log(err)
        res.status(400).json({status: "failure", message: "Blog Could not be Found!!!", data: null});
    }
}


module.exports = {createBlog, showAllBlogs, deleteBlog, getBlogById}