const User=require('../model/user');
const Expense=require('../model/expense');

exports.getLeaderboard=async(req,res,next)=>{

    User.findAll()
        .then(users=>{
            const response=[];
            for(let i=0;i<users.length;i++){
                const id=users[i].dataValues.id;
                const name=users[i].dataValues.name;
                let amount=0;
                Expense.findAll({where:{userId:id}})
                .then(expenses=>{
                    for(let j=0;j<expenses.length;j++){
                        // console.log(expenses[j].dataValues.price);
                        amount=Number(expenses[j].dataValues.price)+amount;
                    }   
                    const obj={
                        "id":id,
                        "name":name,
                        "amount":amount
                    }
                    response.push(obj);
                    if(i===users.length-1){
                        res.status(201).json({"resData":response});
                    }
                })
                .catch(err=>{
                    throw new Error(err);
                })
            }
        })
        .catch(err=>{
            throw new Error(err);
        })
}