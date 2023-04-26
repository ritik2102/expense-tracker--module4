const express=require('express');
const router=express.Router();

const expenseController=require('../controller/expense');

router.post('/post-expense',expenseController.postExpense);
router.get('/get-expense',expenseController.getExpenses);
router.post('/delete-expense/:id',expenseController.deleteExpense);

module.exports=router;