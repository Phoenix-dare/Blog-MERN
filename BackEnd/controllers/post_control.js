var Post= require('../models/post')

exports.post_controller_post=async (req, res) => { 
   const newPost = new Post(req.body); 
   try { 
     const savedPost = await newPost.save(); 
     res.status(200).json(savedPost); 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 }
  
 //UPDATE POST 
 exports.put_controller_post= async (req, res) => { 
   try { 
     const post = await Post.findById(req.params.id); 
     if (post.username === req.body.username) { 
       try { 
         const updatedPost = await Post.findByIdAndUpdate( 
           req.params.id, 
           { 
             $set: req.body, 
           }, 
           { new: true } 
         ); 
         res.status(200).json(updatedPost); 
       } catch (err) { 
         res.status(500).json(err); 
       } 
     } else { 
       res.status(401).json("You can update only your post!"); 
     } 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 }; 
  
 //DELETE POST 
 exports.delete_controller_post= async (req, res) => { 
   try { 
     const post = await Post.findById(req.params.id); 
     if (post.username === req.body.username) { 
       try { 
         await post.delete(); 
         res.status(200).json("Post has been deleted..."); 
       } catch (err) { 
         res.status(500).json(err); 
       } 
     } else { 
       res.status(401).json("You can delete only your post!"); 
     } 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 };
  
 //GET POST 
 exports.get_controller_post= async (req, res) => { 
   try { 
     const post = await Post.findById(req.params.id); 
     res.status(200).json(post); 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 };
  
 //GET ALL POSTS 
 exports.get_controller_allpost=async (req, res) => { 
   const username = req.query.user; 
   const catName = req.query.cat; 
   const search=req.query.search;
   
   let keyWord= new RegExp(search,"gi")
   
   console.log(search,req.query,keyWord)
   try { 
     let posts; 
     if (username) { 
       posts = await Post.find({ username }); 
     } else if (catName) { 
       posts = await Post.find({ 
         category: { 
           $in: catName, 
         }, 
       }); 
     } else if (keyWord){
        posts = await Post.find({$or:[
         {desc:{$in:keyWord,}},
         {title:{$in:keyWord,}},]
   })

       
     }else{
       posts = await Post.find();
     }
     res.status(200).json(posts); 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 };
  
