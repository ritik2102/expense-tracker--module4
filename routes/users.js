const express=require('express');
const router=express.Router();

const userController=require('../controller/users');
const userAuthentication=require('../middleware/auth');

router.post('/add-user',userController.postUser);
router.post('/user-login',userController.postUserLogin);
router.post('/updateToken',userAuthentication.authenticate,userController.postUpdateToken);

// 
module.exports=router;