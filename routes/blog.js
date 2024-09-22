const express = require("express");
const router = express.Router();

const getAllBlogs = require("../controllers/home");

router.route("/blogs").get(getAllBlogs);

module.exports = router;
