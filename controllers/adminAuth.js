const User = require("../models/users")
const statusCodes = require("http-status-codes")

const adminLogin = (req,res)=> {
res.send("admin Login")
}


const adminSignUp = (req,res)=> {
res.send("admin signup")
}

module.exports = {adminLogin,adminSignUp}