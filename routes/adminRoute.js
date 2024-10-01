const express = require("express")
const adminRouter = express.Router()

const {postABlog,updateABlog,deleteABlog} =  require("../controllers/admin")
const {adminLogin, adminSignUp} = require("../controllers/adminAuth")

adminRouter.route("/adminBlog/:id").post(postABlog).patch(updateABlog).delete(deleteABlog)
adminRouter.route("/adminLogin").post(adminLogin)
adminRouter.route("/adminSignUp").post(adminSignUp)

module.exports = adminRouter