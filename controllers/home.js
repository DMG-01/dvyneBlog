  
  const getAllBlogs = async(req,res)=> {
    res.send("display Blogs")
  }

  const getOneBlog = async(req,res)=> {
    res.send("get one blog")
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

