const mongoose = require("mongoose")
require("dotenv").config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,"please enter a name"],
        minlength:1,
        maxlength:26,
        unique:true
    },

    Email: {
        type:String,
        required:[true,"please enter an email"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please enter a valid email"],
        unique:true
    },

    Password: {
        type:String,
        required:[true,"please enter a password"],
        minlength:[7,"paswword must be more than seven characters"]
    }

},
{timestamps:true})

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10)
    this.Password = await bcrypt.hash(this.Password,salt)
    next()
})

userSchema.methods.createJWT = function() {
    const jwtToken = jwt.sign({userId:this._id,name:this.Name},process.env.JWTT,{expiresIn:"30d"})
    console.log(`your jwt token is ${jwtToken}`)
    return jwtToken
}

userSchema.methods.comparePassword = function(passwordToCheck) {
const isMatch = bcrypt.compare(passwordToCheck,this.Password)
return isMatch
}

module.exports = mongoose.model("users",userSchema)