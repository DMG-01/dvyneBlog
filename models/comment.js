const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    User: {
        type:mongoose.Types.ObjectId,
        ref:"users",
        minlength:2,
        required:[true,"User must have a name"]
    },
    Content: {
       type:String,
       minlength:1,
       required:[true,"User must type  comment"]
    },
    Date: {
        type:Date,
        default:Date.now
    }
},
{timestamps:true}
)

module.exports = mongoose.model("comment",commentSchema)