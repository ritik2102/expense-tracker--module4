const priceField=document.getElementById('price');
const productField=document.getElementById('product');
const categoryField=document.getElementById('category');

const dailyHeader=document.getElementById('daily-header');
const monthlyHeader=document.getElementById('monthly-header');
const yearlyHeader=document.getElementById('yearly-header');

const dailyFooter=document.getElementById('daily-footer');
const monthlyFooter=document.getElementById('monthly-footer');
const yearlyFooter=document.getElementById('yearly-footer');

const expenseList=document.getElementById('expense-list');
const formElement=document.querySelector('.form');


async function addExpense(e){

    try{
        e.preventDefault();
        const price=priceField.value;
        const product=productField.value;
        const category=categoryField.value;
        console.log(price,product,category);
        const data={
            'price':price,
            'product':product,
            'category':category,
        };
        console.log(data);
        const token=localStorage.getItem('token');
        const res=axios.post('http://localhost:3000/expense/post-expense',data,{headers:{"Authorization":token}});
        window.location.reload();
    }
    catch(err){
        console.log(err);
    }
    
}



