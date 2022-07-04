const mongoose = require("mongoose");
const  Schema = mongoose.Schema;
const CommentSchema = new Schema(                                    {
     postId: {
       type: String,
       required: true,                                                },
     comment: {
       type: String,
       required: true,
     },
     reply: {
       type: Array,
       required: false,
     },
     username: {
       type: String,
     },
   profilePic: { 
       type: String, 
       default: "", 
     }, 
   }, 
   { timestamps: true } 

 );
                                                                 module.exports = mongoose.model("Comment", CommentSchema);