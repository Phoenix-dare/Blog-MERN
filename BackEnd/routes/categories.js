var express = require('express');       
var router = express.Router();         
var categories_control=require('../controllers/categories_control');
                                                                router.get('/',categories_control.categories_getcontroller);    
router.post('/',categories_control.categories_postcontroller);

module.exports = router;