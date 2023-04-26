const Expense=require('../model/expense');

exports.postExpense=(req,res,next)=>{
    
    const day=new Date();
    const date=day.getDate();
    const month=day.getMonth();
    const year=day.getFullYear();
    
    const price=req.body.price;
    const product=req.body.product;
    const category=req.body.category;
    
    Expense.create({price:price,name:product,category:category,date:date,month:month,year:year})
        .then(result=>{
            res.status(201).json({resData:"success"});
        })
        .catch(err=>{
            console.log(err);
        });
}

exports.getExpenses=(req,res,next)=>{
    
    Expense.findAll()
        .then(expenses=>{
            // console.log(expenses);
            res.status(201).json({resData:expenses});
        })
        .catch(err=>{
            console.log(err);
        });
}

exports.deleteExpense=(req,res,next)=>{
    
    const id=req.params.id;
    Expense.findByPk(id)
        .then(expense=>{
            expense.destroy();
            res.status(201).json({resData:"success"});
        })
        .catch(err=>{
            console.log(err);
        })
}


