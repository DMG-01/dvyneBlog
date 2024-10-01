const statusCodes = require("http-status-codes")
const blog = require("../models/blogModel")
const User = require("../models/users")

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
    //res.send("deleted")
}

const getAllUsers = async(req,res)=> {
   try{
 const allUsers = await User.find()
 const totalNumberOfUsers = allUsers.length
 res.status(statusCodes.OK).json({allUsers,totalNumberOfUsers})
   }catch(error){
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
   }
}

module.exports = {postABlog,updateABlog,deleteABlog,getAllUsers}