const User=require('../model/user');

exports.postUser=(req,res,next)=>{
    console.log(req.body);
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    User.create({name:name,email:email,password:password})
        .then(result=>{
            res.status(201).json({resData:"success"});
        })
        .catch(err=>{
            console.log(err.errors[0].message);
            const error=err.errors[0].message;
            res.status(201).json({resData:error});
        })
}