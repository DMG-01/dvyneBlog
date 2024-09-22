const express = require("express");
const router = express.Router();

const {getAllBlogs,getOneBlog,likeABlog,unlikeABlog,commentOnABlog} = require("../controllers/home");

router.route("/").get(getAllBlogs);
router.route("/:id").get(getOneBlog)
router.route("/:id/like").post(likeABlog)
router.route("/:id/unlike").delete(unlikeABlog)
router.route("/:id/comment").post(commentOnABlog)

module.exports = router;
