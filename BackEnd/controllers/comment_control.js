var Comment= require('../models/comment')

exports.comment_controller_post=async (req, res) => { 
   const newComment = new Comment(req.body); 
   try { 
     const savedComment = await newComment.save(); 
     res.status(200).json(savedComment); 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 }
  
 //UPDATE POST 
 exports.put_controller_comment= async (req, res) => { 
   try { 
     const post = await Comment.findById(req.params.id); 
     if (post.username === req.body.username) { 
       try { 
         const updatedComment = await Post.findByIdAndUpdate( 
           req.params.id, 
           { 
             $set: req.body, 
           }, 
           { new: true } 
         ); 
         res.status(200).json(updatedComment); 
       } catch (err) { 
         res.status(500).json(err); 
       } 
     } else { 
       res.status(401).json("You can Edit only your comments!"); 
     } 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 }; 
  
 //DELETE POST 
 exports.delete_controller_comment= async (req, res) => { 
   try { 
     const delComment = await Comment.findById(req.params.id); 
     if (delComment.username === req.body.username) { 
       try { 
         await Comment.delete(); 
         res.status(200).json("Post has been deleted..."); 
       } catch (err) { 
         res.status(500).json(err); 
       } 
     } else { 
       res.status(401).json("You can delete only your Comment!"); 
     } 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 };
  
 //Get comment
 exports.get_controller_comment= async (req, res) => { 
   try { 
     const postedComment= await Comment.findById(req.params.id); 
     res.status(200).json(postedComment); 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 };
  
 //all comments
 exports.get_controller_allcomments=async (req, res) => { 
   const reqComment=req.query.postId;
 try{
       const getComments= await Comment.find({ 
         postId: { 
           $in:reqComment, 
         }, 
       }); 
          res.status(200).json(getComments); 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 };
  //push reply
exports.put_controller_reply= async (req, res) => { 
     
       try { 
         const pushReply= await Comment.findByIdAndUpdate(  req.params.id, 
           { 
             $push:{reply:req.body
                   
            },
             
                },     
                                                          
         
         ); 
         res.status(200).json(pushReply); 
       } catch (err) { 
         res.status(500).json(err); 
       } 
     }; 
  
//all reply
 exports.get_controller_allreplies=async (req, res) => { 
   const reqReply=req.query.comId;
  
   
 try{
       const getReply= await Comment.find({
      reply:{
           $elemMatch:{ commentId:reqReply
         },
           }
           });

const filtered=getReply.map(rep=>rep.reply)
   
console.log(getReply,filtered)

   res.status(200).json(filtered)
   } catch (err) { 
     res.status(500).json(err); 
   } 
 };