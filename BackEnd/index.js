const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const multer = require("multer");
const bcrypt = require('bcryptjs');
const cors = require('cors')

const app = express();
app.use(cors({
  credentials: true,
}));
dotenv.config();



mongoose.connect(process.env.mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const UserModel=require('./models/user');
  
//---setting up passport authentication

 
const postRouter = require('./routes/post');
const  usersRouter = require('./routes/users');
const categoriesRouter=require('./routes/categories');
const authRouter=require('./routes/auth');
const commentRouter=require('./routes/comments')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});


const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});







app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers', '*'
  );
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', '*');
  next();
});
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('cats'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "cats", 
cookie:{secure:true},
resave: false, 
saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session()); 
 require("./passportConfig")(passport);

//app.use(function (req, res,next){
    //res.locals.currentUser = req.user;
  //  next();
//})




app.use('/post', postRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter);
app.use('/categories',categoriesRouter);
app.use('/comments',commentRouter)

//---authenticated user
app.get("/user", (req, res) => { 
   res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it. 
 });


app.listen("5000", () => { 
   console.log("Backend is running."); 
 });
