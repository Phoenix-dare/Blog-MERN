var express = require('express');        
var router = express.Router();
var auth_control=require('../controllers/auth_control');
/* GET users listing. */
router.get('/',auth_control.auth_get_controller);                router.post('/register',auth_control.auth_post_register_controller);

router.get('/user',auth_control.auth_get_login_status)


router.post('/login',auth_control.auth_post_login_controller);
module.exports = router;
router.get('/logout',auth_control.auth_post_logout_controller);