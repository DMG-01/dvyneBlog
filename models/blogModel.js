const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    title : {
        type:String,
        required:[true,"blog must have a title"],
        minlength:[2,"blog title must have more than one character"],
    },
    content : {
        type:String,
        required:[true,"blog must have content"],
        minlength:10
    },
    likes: {
        type:Number,
        required:true,
    },
    comments: {
        type:[mongoose.Types.ObjectId],
        ref:"comment",
        default:[]
    }

},{timestamps:true})


module.exports = mongoose.model("blog", blogSchema)