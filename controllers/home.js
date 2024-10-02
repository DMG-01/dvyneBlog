const mongoose = require("mongoose");
const blog = require("../models/blogModel");
const statusCodes = require("http-status-codes");
const comments = require("../models/comment")
const { object } = require("joi");

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogContent = await blog.find().populate("comments").populate('blogLikes', 'name');
    const numberOfBlogs = blogContent.length;

    // Map through blogContent to add number of likes
    const blogsWithLikesCount = blogContent.map(blog => ({
      ...blog.toObject(), // Convert Mongoose Document to plain object
      numberOfLikes: blog.blogLikes.length, // Add number of likes
    }));

    res.status(statusCodes.OK).json({ blogs: blogsWithLikesCount, numberOfBlogs });
  } catch (error) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to retrieve blogs", error });
  }
};


// Get one blog by ID
const getOneBlog = async (req, res) => {
  try {
    const blogContent = await blog.findOne({ _id: req.params.id }).populate("comments").populate("blogLikes","name");


    if (!blogContent) {
      return res.status(statusCodes.NOT_FOUND).json({ msg: "No content found" });
    }
    blogContent.clicks++
   await blogContent.save()

   const numberOfLikes = blogContent.blogLikes.length;
    res.status(statusCodes.OK).json({ blogContent,numberOfLikes });
  } catch (error) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to retrieve the blog", error });
  }
};

// Like a blog
const likeABlog = async (req, res) => {
  const {
    user: { userId },
    params: { id: blogId },
  } = req;

  try {
    const blogContent = await blog.findOne({ _id: blogId });

    if (!blogContent) {
      return res.status(statusCodes.NOT_FOUND).json({ msg: "No content found" });
    }

    
    let objectIdUserId;
    try {
      objectIdUserId = mongoose.Types.ObjectId(userId);
    } catch (error) {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: "Invalid user ID" });
    }

    // Check if the user has already liked the blog
   if (blogContent.blogLikes.includes(objectIdUserId)) {
    return res.status(statusCodes.BAD_REQUEST).json({msg:"This blog has already been liked"})
   }

    // Add userId to the likes array
    blogContent.blogLikes.push(objectIdUserId);
    const numberOfLikes = blogContent.blogLikes.length;
    await blogContent.save();

    res.status(statusCodes.OK).json({ blogContent, numberOfLikes });
  } catch (error) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to like the blog", error });
  }
};

// Unlike a blog
const unlikeABlog = async (req, res) => {


    const {
      user: {userId},
      params:{id:blogId}
    } = req

    try {
      
      const blogContent = await blog.findOne({_id:blogId})

      if(!blogContent) {
       return  res.status(statusCodes.NOT_FOUND).json({msg:`no Blog with id ${blogId} found`})
      }

      let objectUserID
      try {
       objectUserID = mongoose.Types.ObjectId(userId)
      }catch(error){
        res.status(statusCodes.BAD_REQUEST).json({msg:error})
      }
     
        if(blogContent.blogLikes.includes(objectUserID)) {

          blogContent.blogLikes = blogContent.blogLikes.filter((likes)=> likes.toString() !== objectUserID.toString())
          const numberOfLikes = blogContent.blogLikes.length
          await blogContent.save()
          return res.status(statusCodes.OK).json({ msg: "Blog unliked", blogContent, numberOfLikes });

        }else {
          return res.status(statusCodes.BAD_REQUEST).json({msg:"this blog hasnt been liked"})
        }
      
    }catch(error){
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
    }
};

// Comment on a blog
const commentOnABlog = async (req, res) => {
 try {
  const{
    user:{userId,name},
    params:{id:blogId}
  } = req

  let objectUserId 
  try {
    objectUserId = mongoose.Types.ObjectId(userId)
  
  }catch(error){
    res.status(statusCodes.BAD_REQUEST).json({msg:error})
  }
req.body.UserName = name
req.body.User = objectUserId
  const commentContent = await comments.create(req.body)
  const blogContent = await blog.findOne({_id:blogId})

  if(!blogContent) {
   return res.status(statusCodes.BAD_REQUEST).json({msg: `No blog with id ${blogId} found`})
  }

   blogContent.comments.push(commentContent._id)
   await blogContent.save()
 
  res.status(statusCodes.OK).json({commentContent,blogContent})

 }catch(error){
  res.status(statusCodes.BAD_REQUEST).json({msg:error})
 }
}

const likeABlogComment = async(req,res)=> {
  res.send("blog liked")
}

module.exports = { getAllBlogs, getOneBlog, likeABlog, unlikeABlog, commentOnABlog, likeABlogComment };
