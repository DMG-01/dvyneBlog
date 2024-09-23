const mongoose = require("mongoose")

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
    }

},
{timestamps:true})

module.exports = mongoose.model("users",userSchema)