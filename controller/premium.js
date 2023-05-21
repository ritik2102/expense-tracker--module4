const Sequelize=require('sequelize');
const sequelize=require('../util/database');
const User=require('../model/user');
const Expense=require('../model/expense');

exports.getLeaderboard=async(req,res,next)=>{

    const leaderboardOfUsers=await User.findAll({
        attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.price')),'total_cost']],
        include:[
            {
                model:Expense,
                attributes:[]
            }
        ],
        group:['user.id'],
        order:[[sequelize.col("total_cost"),"DESC"]]
    })
    leaderboardOfUsers.sort((a,b)=>b.total_cost-a.total_cost);
    res.status(201).json({"resData":leaderboardOfUsers});
}
