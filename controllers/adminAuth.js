const User = require("../models/users")
const statusCodes = require("http-status-codes")

const adminLogin = (req,res)=> {
//res.send("admin Login")
}


const adminSignUp = async (req,res)=> {
//res.send("admin signup")

const {name,email,password} = req.body 

if(!name) {
   return res.status(statusCodes.BAD_REQUEST).json({msg:"enter your username"})
}
else if(!email) {
   return res.status(statusCodes.BAD_REQUEST).json({msg:"enter your Email"})
}
else if(!password) {
    return res.status(statusCodes.BAD_REQUEST).json({msg:"enter your password"})
}

try {
const _user = await User.create({...req.body})

const token = _user.createJWT()

res.status(statusCodes.CREATED).json({
   user: {name:_user.name},
   jsonToken : token
})


}catch(error) {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
}
}

module.exports = {adminLogin,adminSignUp}