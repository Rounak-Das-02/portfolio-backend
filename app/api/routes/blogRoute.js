const express = require("express")
const blogRouter = express.Router()

const blogController = require("../../controllers/blogs")
const verify = require("../../controllers/verifyToken")

blogRouter.post("/createblog" , verify , blogController.createBlog)
blogRouter.get("/showall" , blogController.showAllBlogs)
blogRouter.delete("/delete/:id", verify, blogController.deleteBlog)
blogRouter.get("/getblog/:id", blogController.getBlogById)
blogRouter.get("/showfew/:number" , blogController.showFewBlogs)


module.exports = blogRouter