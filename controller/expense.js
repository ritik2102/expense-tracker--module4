const Expense=require('../model/expense');
const jwt=require('jsonwebtoken');

exports.postExpense=(req,res,next)=>{
    
    const day=new Date();
    const date=day.getDate();
    const month=day.getMonth();
    const year=day.getFullYear();
    
    const price=req.body.price;
    const product=req.body.product;
    const category=req.body.category;

    const token=req.header('Authorization');
    const user=jwt.verify(token,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    const userId=user.userId;
    console.log(userId);
    Expense.create({userId:userId,price:price,name:product,category:category,date:date,month:month,year:year})
        .then(result=>{
            res.status(201).json({resData:"success"});
        })
        .catch(err=>{
            console.log(err);
        });
}

exports.getExpenses=(req,res,next)=>{
    
    Expense.findAll({where:{userId:req.user.id}})
        .then(expenses=>{
            console.log(expenses);
            res.status(201).json({resData:expenses});
        })
        .catch(err=>{
            console.log(err);
        });
}

exports.deleteExpense=(req,res,next)=>{
    
    const id=req.params.id;
    const token=req.header('Authorization');
    const user=jwt.verify(token,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    const userId=user.userId;
    console.log(id,userId);

    Expense.findAll({where:{id:id,userId:userId}})
        .then(expense=>{
            expense[0].destroy();
            res.status(201).json({resData:"success"});
        })
        .catch(err=>{
            console.log(err);
        })
}


