
var Category= require('../models/category')

                                                                exports.categories_getcontroller=async (req, res, next) => { 
     try { 
       const categories = await Category.find(); 
       res.status(200).json(categories); 
     } catch (err) { 
       res.status(500).json(err); 
     } 
   }                                                     


exports.categories_postcontroller= async (req, res,next) => { 
   const newCategory = new Category(req.body); 
   try { 
     const savedCateg = await newCategory.save(); 
     res.status(200).json(savedCateg); 
   } catch (err) { 
     res.status(500).json(err); 
   } 
 }