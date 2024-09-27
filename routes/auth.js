const express = require("express")
const authRouter = express.Router()
const {login,signUp} = require("../controllers/auth")

authRouter.route("/login").post(login)
authRouter.route("/signup").post(signUp)

module.exports = authRouter