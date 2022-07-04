var express = require('express');        
var router = express.Router();                                
var user_control=require('../controllers/user_control');       

router.put("/:id", user_control.user_put_controller)
 //DELETE 
 router.delete("/:id", user_control.user_delete_controller)
 //GET USER 
 router.get("/:id",user_control.user_get_controller)
 module.exports = router;



