const express = require("express")
const adminRouter = express.Router()

const {postABlog,updateABlog,deleteABlog} =  require("../controllers/admin")

adminRouter.route("/:id").post(postABlog).patch(updateABlog).delete(deleteABlog)

module.exports = adminRouter