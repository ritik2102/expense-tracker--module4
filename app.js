const express=require("express");
const app=express();

const bodyParser=require("body-parser");
app.use(bodyParser.json({extended: false}));

const cors=require('cors');
app.use(cors());
const sequelize=require('./util/database');

const userRoutes=require('./routes/users');
const expenseRoutes=require('./routes/expense');

app.use('/users',userRoutes);
app.use('/expense',expenseRoutes);

// {force:true}
sequelize.sync()
    .then(result=>{
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err);
    })
