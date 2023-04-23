const User=require('../model/user');
const bcrypt=require("bcrypt");

exports.postUser=(req,res,next)=>{
    
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;

    bcrypt.hash(password,10, (err,hash)=>{
        User.create({name:name,email:email,password:hash})
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
                console.log(hash);
                bcrypt.compare(password,users[0].dataValues.password,(err,result)=>{
                    if(err){
                        throw new Error("Something went wrong");
                    }
                    if(result==true){
                        res.status(201).json({resData:'loginSuccessful'});
                    }
                    else{
                        res.status(401).json({resData:'incorrectPassword'});
                    }
                })
                // password does not match
                // if(users[0].dataValues.password!==password){
                //     res.status(401).json({resData:'incorrectPassword'});
                // }
                // // password matches
                // else{
                //     res.status(201).json({resData:'loginSuccessful'});
                // }
            }
        })
        .catch(err=>{
            console.log(err);
        })
}