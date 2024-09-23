const statusCodes = require("http-status-codes")
const blog = require("../models/blogModel")

const postABlog = async(req,res)=> {
   // res.send("a blog has been posted")

   const blogContent = await blog.create(req.body) 
   res.status(statusCodes.OK).json({blogContent})
}

const updateABlog = async(req,res)=> {
    res.send("a blog has been updated")
}

const deleteABlog = async(req,res) => {
    res.send("a blog has been deleted")
}

module.exports = {postABlog,updateABlog,deleteABlog}