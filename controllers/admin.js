const postABlog = async(req,res)=> {
    res.send("a blog has been posted")
}

const updateABlog = async(req,res)=> {
    res.send("a blog has been updated")
}

const deleteABlog = async(req,res) => {
    res.send("a blog has been deleted")
}

module.exports = {postABlog,updateABlog,deleteABlog}