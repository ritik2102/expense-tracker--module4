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
            'category':category
        };
        const res=axios.post('http://localhost:3000/expense/post-expense',data);
        window.location.reload();
    }
    catch(err){
        console.log(err);
    }
    
}
function logData(record){
    
    const price=record.price;
    const name=record.name;
    const category=record.category;
    
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${name}  ${price}  `));
    expenseList.appendChild(li);
}
async function daily(){

    const res=await axios.get('http://localhost:3000/expense/get-expense');
    res.data.resData.forEach((record)=>{
        const day=new Date();
        const date=day.getDate();
        const month=day.getMonth();
        const year=day.getFullYear();

        if(Number(record.date)===date && Number(record.month)===month && Number(record.year)===year){
            // console.log('ok');
            logData(record);
        }
    });
    
}
async function monthly(){
    const res=await axios.get('http://localhost:3000/expense/get-expense');
}

async function yearly(){
    const res=await axios.get('http://localhost:3000/expense/get-expense');
}

dailyHeader.addEventListener('click',daily);
dailyFooter.addEventListener('click',daily);

monthlyHeader.addEventListener('click',monthly);
monthlyFooter.addEventListener('click',monthly);

yearlyHeader.addEventListener('click',yearly);
yearlyFooter.addEventListener('click',yearly);
