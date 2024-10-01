const User = require("../models/users")
const statusCodes = require("http-status-codes")

const adminLogin = async (req,res)=> {
//res.send("admin Login")

const {email,password} = req.body

if(!email) {
    return res.status(statusCodes.BAD_REQUEST).json({msg:"please enter your email"})
}
else if(!password) {
    return res.status(statusCodes.BAD_REQUEST).json({msg:"please enter your password"})
}

try {
    const _user = await User.findOne({email:email})
    
    if(!_user) {
      return  res.status(statusCodes.NOT_FOUND).json({msg:`No User with ${email} found`})
    }

    const isPassword = await _user.comparePassword(password)

    if(!isPassword) {
        return res.status(statusCodes.UNAUTHORIZED).json({msg:"AUTHENTICATION FAILED"})
    }

    const jwtToken = await _user.createJWT()

    res.status(statusCodes.OK).json({
        user:{name:_user.name},
        token:jwtToken
    })
    
}catch(error){
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({msg:error})
}
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