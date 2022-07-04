var express = require('express');       
var router = express.Router();         
var post_control=require('../controllers/post_control')
                                                                
router.get('/:id',post_control.get_controller_post);    
router.post('/',post_control.post_controller_post);
router.get('/',post_control.get_controller_allpost);    
router.put('/:id',post_control.put_controller_post);
router.delete('/:id',post_control.delete_controller_post)
module.exports = router;