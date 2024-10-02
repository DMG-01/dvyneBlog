const mongoose = require("mongoose");
const blog = require("../models/blogModel");
const statusCodes = require("http-status-codes");
const comments = require("../models/comment");

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
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to retrieve blogs", error });
  }
};


// Get one blog by ID
const getOneBlog = async (req, res) => {
  try {
    const blogContent = await blog.findOne({ _id: req.params.id }).populate("comments").populate("blogLikes","name");

    if (!blogContent) {
      return res.status(statusCodes.NOT_FOUND).json({ msg: "No content found" });
    }

    blogContent.clicks++;
    await blogContent.save();

    const numberOfLikes = blogContent.blogLikes.length;
    return res.status(statusCodes.OK).json({ blogContent, numberOfLikes });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to retrieve the blog", error });
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

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: "Invalid user ID" });
    }

    let objectIdUserId = mongoose.Types.ObjectId(userId);

    // Check if the user has already liked the blog
    if (blogContent.blogLikes.includes(objectIdUserId)) {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: "This blog has already been liked" });
    }

    // Add userId to the likes array
    blogContent.blogLikes.push(objectIdUserId);
    const numberOfLikes = blogContent.blogLikes.length;
    await blogContent.save();

    return res.status(statusCodes.OK).json({ blogContent, numberOfLikes });
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to like the blog", error });
  }
};

// Unlike a blog
const unlikeABlog = async (req, res) => {
  const {
    user: { userId },
    params: { id: blogId }
  } = req;

  try {
    const blogContent = await blog.findOne({ _id: blogId });

    if (!blogContent) {
      return res.status(statusCodes.NOT_FOUND).json({ msg: `No Blog with id ${blogId} found` });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: "Invalid user ID" });
    }

    let objectUserId = mongoose.Types.ObjectId(userId);

    if (blogContent.blogLikes.includes(objectUserId)) {
      blogContent.blogLikes = blogContent.blogLikes.filter((likes) => likes.toString() !== objectUserId.toString());
      const numberOfLikes = blogContent.blogLikes.length;
      await blogContent.save();
      return res.status(statusCodes.OK).json({ msg: "Blog unliked", blogContent, numberOfLikes });
    } else {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: "This blog hasn't been liked" });
    }
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Failed to unlike the blog", error });
  }
};

// Comment on a blog
const commentOnABlog = async (req, res) => {
  try {
    const {
      user: { userId, name },
      params: { id: blogId }
    } = req;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: "Invalid user ID" });
    }

    req.body.UserName = name;
    req.body.User = mongoose.Types.ObjectId(userId);

    const commentContent = await comments.create(req.body);
    const blogContent = await blog.findOne({ _id: blogId });

    if (!blogContent) {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: `No blog with id ${blogId} found` });
    }

    blogContent.comments.push(commentContent._id);
    await blogContent.save();

    return res.status(statusCodes.OK).json({ commentContent, blogContent });
  } catch (error) {
    return res.status(statusCodes.BAD_REQUEST).json({ msg: error.message });
  }
};

const likeUnlikeABlogComment = async (req, res) => {
  const { user: { userId }, params: { commentId } } = req;

  try {
    const commentContent = await comments.findOne({ _id: req.params.id });

    if (!commentContent) {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: "No comment found" });
    }

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(statusCodes.BAD_REQUEST).json({ msg: "Invalid user ID" });
    }

    let objectUserId = mongoose.Types.ObjectId(userId);

    if (commentContent.likes.includes(objectUserId)) {
      commentContent.likes = commentContent.likes.filter((like) => like.toString() !== objectUserId.toString());
      const numberOfLikes = commentContent.likes.length;
      await commentContent.save();
      return res.status(statusCodes.OK).json({ msg: "Comment unliked successfully", numberOfLikes });
    } else {
      commentContent.likes.push(objectUserId);
      const numberOfLikes = commentContent.likes.length;
      await commentContent.save();
      return res.status(statusCodes.OK).json({ msg: "Comment liked successfully", numberOfLikes });
    }
  } catch (error) {
    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message });
  }
};

module.exports = { getAllBlogs, getOneBlog, likeABlog, unlikeABlog, commentOnABlog, likeUnlikeABlogComment };
