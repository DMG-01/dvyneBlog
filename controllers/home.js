  const blog = require("../models/blogModel")
  const statusCodes = require("http-status-codes")


  const getAllBlogs = async(req,res)=> {
    const blogContent = await blog.find()
    res.status(statusCodes.OK).json({blogContent})
  }

  const getOneBlog = async(req,res)=> {
   
   
   const blogContent = await blog.findOne({_id : req.params.id})
   res.status(statusCodes.OK).json({blogContent})

   if(blogContent) {
    res.status(statusCodes.OK).json({msg:"no content found"})
   }
  }

  const likeABlog = async(req,res) => {
    res.send("a blog has been liked")
  }

  const unlikeABlog = async(req,res)=> {
    res.send("a blog has been unliked")
  }

  const commentOnABlog = async(req,res)=> {
    res.send("a comment has been added to a blog")
  }
  module.exports = {getAllBlogs,getOneBlog,likeABlog,unlikeABlog,commentOnABlog}

