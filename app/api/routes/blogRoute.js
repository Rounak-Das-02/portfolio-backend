const express = require("express")
const blogRouter = express.Router()

const blogController = require("../../controllers/blogs")
const verify = require("../../controllers/verifyToken")

blogRouter.post("/createblog" , verify , blogController.createBlog)
blogRouter.get("/showall" , blogController.showAllBlogs)
blogRouter.post("/delete", verify, blogController.deleteBlog)
blogRouter.get("/getblog/:id", blogController.getBlogById)



module.exports = blogRouter