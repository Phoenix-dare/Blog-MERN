const UserModel = require('../models/user')
const bcrypt = require('bcryptjs');
const Post=require('../models/post')
const Comment=require('../models/comment')

exports.user_get_controller=async (req, res) => { 
   try { 
     const user = await UserModel.findById(req.params.id); 
     const { password, ...others } = user._doc; 
     res.status(200).json(others); 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 }; 

exports.user_put_controller=async (req, res) => { 
   if (req.body.userId === req.params.id) { 
     if (req.body.password) { 
       const salt = await bcrypt.genSalt(10); 
       req.body.password = await bcrypt.hash(req.body.password, salt); 
     } 
     try { 
       const updatedUser = await UserModel.findByIdAndUpdate( 
         req.params.id, 
         { 
           $set: req.body, 
         }, 
         { new: true } 
       ); 
         
         
       
       res.status(200).json(updatedUser); 
     } catch (err) { 
       res.status(500).json(err); 
     } 
   } else { 
     res.status(401).json("You can update only your account!"); 
   } 
 }; 




  
exports.user_delete_controller=async (req, res) => {  
     try { 
       const user = await UserModel.findById(req.params.id); 
       try { 
         await Post.deleteMany({ username: user.username }); 
         await UserModel.findByIdAndDelete(req.params.id); 

         await Comment.deleteMany({username:user.username});

         res.status(200).json("User has been deleted..."); 
       } catch (err) { 
         res.status(500).json(err); 
       } 
     } catch (err) { 
       res.status(404).json("User not found!"); 
   }
   }
