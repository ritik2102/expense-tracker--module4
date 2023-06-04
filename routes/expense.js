const express=require('express');
const router=express.Router();

const expenseController=require('../controller/expense');
const userAuthentication=require('../middleware/auth');

router.post('/post-expense',userAuthentication.authenticate,expenseController.postExpense);
router.get('/get-expense',userAuthentication.authenticate,expenseController.getExpenses);
router.post('/delete-expense/:id',userAuthentication.authenticate,expenseController.deleteExpense);

module.exports=router;