const User=require('../model/user');

exports.postUser=(req,res,next)=>{
    
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
                // password does not match
                if(users[0].dataValues.password!==password){
                    res.status(401).json({resData:'incorrectPassword'});
                }
                // password matches
                else{
                    res.status(201).json({resData:'loginSuccessful'});
                }
            }
        })
        .catch(err=>{
            console.log(err);
        })
}