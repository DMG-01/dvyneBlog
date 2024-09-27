const mongoose = require("mongoose")
require("dotenv").config()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter a name"],
        minlength:1,
        maxlength:26,
        unique:true
    },

    email: {
        type:String,
        required:[true,"please enter an email"],
        match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please enter a valid email"],
        unique:true
    },

    password: {
        type:String,
        required:[true,"please enter a password"],
        minlength:[7,"paswword must be more than seven characters"]
    }

},
{timestamps:true})

userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
    next()
})

userSchema.methods.createJWT = function() {
    const jwtToken = jwt.sign({userId:this._id,name:this.name},process.env.JWTT,{expiresIn:"30d"})
    console.log(`your jwt token is ${jwtToken}`)
    return jwtToken
}

userSchema.methods.comparePassword = async function(passwordToCheck) {
    const isMatch = await bcrypt.compare(passwordToCheck,this.password)
    return isMatch
}


module.exports = mongoose.model("users",userSchema)