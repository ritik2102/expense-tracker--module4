const express=require("express");
const router=express.Router();

const passwordController=require('../controller/password');

router.post('/forgotPassword',passwordController.passwordReset);
module.exports=router;