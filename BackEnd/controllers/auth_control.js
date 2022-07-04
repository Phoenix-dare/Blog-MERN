const UserModel = require("../models/user")
const bcrypt = require("bcryptjs");
const passport = require("passport");


exports.auth_get_controller=function(req, res, next) {
    res.send('auth')

}
exports.auth_post_register_controller=async (req, res, next) => {
  
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new UserModel({
    name:req.body.name,
    username: req.body.username,
    password: hashedPassword,
    email:req.body.email,
    profilePic:req.body.profilePic,
  }).save(err => {
    if (err) { 
      return next(err);
    }
    res.send("user created");
  });
}

          

exports.auth_get_login_status=(req, res) => { 
   res.send(res.locals.currentUser); // The req.user stores the entire user that has been authenticated inside of it. 
 };



exports.auth_post_login_controller=(req, res, next) => { 
   passport.authenticate("local", (err, user, info) => { 
     if (err) throw err; 
     if (!user) res.json(null); 
     else { 
       req.logIn(user, (err) => { 
         if (err) throw err; 
         
             const { password, ...others } = user._doc; 
     res.status(200).json(others)
         
        
         console.log(req.user); 
       }); 
     } 
   })(req, res, next); 
 }
exports.auth_post_logout_controller=(req, res) => {
  req.logOut(function (err) {
    if (err) {
      return next(err);
    }
  res.send("logged out")
  });
  
}

  
