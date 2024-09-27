const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication")

const {getAllBlogs,getOneBlog,likeABlog,unlikeABlog,commentOnABlog} = require("../controllers/home");

router.route("/").get(getAllBlogs);
router.route("/:id").get(getOneBlog)
router.route("/:id/like").post(authentication,likeABlog)
router.route("/:id/unlike").delete(authentication,unlikeABlog)
router.route("/:id/comment").post(authentication,commentOnABlog)

module.exports = router;
