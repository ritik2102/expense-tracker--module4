const express=require('express');
const router=express.Router();

const userController=require('../controller/users');

router.post('/add-user',userController.postUser);

module.exports=router;