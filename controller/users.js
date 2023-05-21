const User=require('../model/user');
const bcrypt=require("bcrypt");
const jwt=require('jsonwebtoken');

require('dotenv').config();

exports.postUser=(req,res,next)=>{
    
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    bcrypt.hash(password,10, (err,hash)=>{
        User.create({name:name,email:email,password:hash,isPremium:'false'})
        .then(result=>{
            res.status(201).json({resData:"success"});
        })
        .catch(err=>{
            console.log(err.errors[0].message);
            const error=err.errors[0].message;
            res.status(201).json({resData:error});
        })
    })
    
}

function generateAccessToken(id,name,isPremium){
    
    return jwt.sign({userId:id, name:name,isPremium:isPremium},'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
}

exports.postUserLogin=(req,res,next)=>{

    const email=req.body.email;
    const password=req.body.password;
    console.log(email,password);
    User.findAll({where:{email:email}})
        .then(users=>{
            // if the user does not exist
            if(!users[0]){
                res.status(404).json({resData:'notFound'});
            }
            // user exists
            else{
                hash=users[0].dataValues.password;
                bcrypt.compare(password,users[0].dataValues.password,(err,result)=>{
                    if(err){
                        throw new Error("Something went wrong");
                    }
                    if(result==true){
                        res.status(201).json({resData:'loginSuccessful',token:generateAccessToken(users[0].id,users[0].name,users[0].isPremium)});
                    }
                    else{
                        res.status(401).json({resData:'incorrectPassword'});
                    }
                })
            }
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.postUpdateToken=(req,res,next)=>{

    try{
        console.log(req.user.dataValues);
        const id=req.user.dataValues.id;
        const name=req.user.dataValues.name;
        const isPremium=req.user.dataValues.isPremium;
        console.log(id,name,isPremium);
        res.status(201).json({resData:'token updation successful',token:generateAccessToken(id,name,isPremium)});
    }
    catch(err){
        console.log(err);
    }
}