const statusCodes = require("http-status-codes")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const Authentication = async (req,res,next)=> {

    const authHeader = req.headers.authorization

    if(!authHeader|| !authHeader.startsWith('Bearer')) {
        res.status(statusCodes.UNAUTHORIZED).send("unauthorized")
    }

    const token = authHeader.split(" ")[1]
    console.log(token)
    try {
        const payload = jwt.verify(token,process.env.jwtt)
        req.user = {userId:payload.userId,name:payload.name}
        next()
    }catch(error) {
        console.log(error)
    }
}


module.exports = authentication