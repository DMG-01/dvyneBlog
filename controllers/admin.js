const statusCodes = require("http-status-codes")
const blog = require("../models/blogModel")

const postABlog = async(req,res)=> {
   // res.send("a blog has been posted")

   const blogContent = await blog.create(req.body) 
   res.status(statusCodes.OK).json({blogContent})
}

const updateABlog = async(req,res)=> {
   // res.send("a blog has been updated")
   const blogContent = await blog.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})
   res.status(statusCodes.OK).json({blogContent})
}

const deleteABlog = async(req,res) => {
    await blog.findOneAndDelete({_id:req.params.id})
    res.status(statusCodes.OK).json({msg:"blog has been deleted"})
}

module.exports = {postABlog,updateABlog,deleteABlog}