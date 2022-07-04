var express = require('express');       
var router = express.Router();         
var comment_control=require('../controllers/comment_control')
                                                                
router.get('/:id',comment_control.get_controller_comment);    
router.post('/',comment_control.comment_controller_post);
router.get('/',comment_control.get_controller_allcomments);    
router.put('/:id',comment_control.put_controller_comment);
router.delete('/:id',comment_control.delete_controller_comment);




router.put('/reply/:id',comment_control.put_controller_reply)
router.get('/get/reply',comment_control.get_controller_allreplies)


module.exports = router;