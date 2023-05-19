const jwt=require('jsonwebtoken');
const User=require('../model/user');

const authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        const user=jwt.verify(token,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
        console.log(user.userId);
        User.findByPk(user.userId).
            then(user=>{
                req.user=user;
                console.log("Done");
                next();
            })
            .catch(err=>{
                throw new Error(err);
            })
    }
    catch(err){
        console.log(err);
        return res.status(401).json({success: false});
    }
}

module.exports={authenticate};