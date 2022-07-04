const mongoose= require('mongoose');   
const  Schema = mongoose.Schema;

const UserSchema = new Schema( { 
  name:{
    type:String,
    required:true,
  },
     username: { 
       type: String, 
       required: true, 
       unique: true, 
     }, 
     email: { 
       type: String, 
       required: true, 
       unique: true, 
     }, 
     password: { 
       type: String, 
       required: true, 
     }, 
     profilePic: { 
       type: String, 
       default: "", 
     }, 
   }, 
   { timestamps: true } 
)

const UserModel = mongoose.model("user", UserSchema)
module.exports = UserModel;