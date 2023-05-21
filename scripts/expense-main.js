const razorpayBtn=document.getElementById('razorpayBtn');

const priceField=document.getElementById('price');
const productField=document.getElementById('product');
const categoryField=document.getElementById('category');

const mainSection=document.getElementById('main-section');
const leaderboardList=document.getElementById('leaderboardList');
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
        const res=await axios.post('http://localhost:3000/expense/post-expense',data,{headers:{"Authorization":token}});
        window.location.reload();
    }
    catch(err){
        console.log(err);
    }
    
}

document.getElementById('razorpayBtn').onclick= async function(e){
    e.preventDefault();
    const token=localStorage.getItem('token');
    const response=await axios.get('http://localhost:3000/purchase/premiumMembership',{headers:{"Authorization":token}});
    console.log(response);


    var options={
        "key":response.data.key_id,//key id generated from the dashboard
        "order_id":response.data.order.id,//order id for a particular order
        "handler": async function(response){
            await axios.post('http://localhost:3000/purchase/updateTransactionStatus',{
                order_id:options.order_id,
                payment_id:response.razorpay_payment_id
            },{headers:{"Authorization":token}});

            alert("You are a premium user now");

            console.log(token);
            const res=await axios.post('http://localhost:3000/users/updateToken','',{headers:{"Authorization":token}});
            localStorage.setItem('token',res.data.token);
            window.location.reload();
        }
    };

    const rzp1=new Razorpay(options);
    rzp1.open();
    e.preventDefault();

    rzp1.on("payment.failed",function(response){
        console.log(response);
        alert("Something went wrong");
    });
}

function comparator(x,y){
    return x.amount<y.amount;
}

document.addEventListener('DOMContentLoaded',async()=>{
    
    const token=localStorage.getItem('token');
    const response=await axios.get('http://localhost:3000/purchase/premiumOrNot',{headers:{"Authorization":token}});
    const isPremium=response.data.isPremium;
    
    if(isPremium==='true'){
        razorpayBtn.innerHTML='Premium User';
        razorpayBtn.classList.add('premiumButton');

        const boardButton=document.createElement('button');
        boardButton.classList.add('boardButton');
        boardButton.appendChild(document.createTextNode('Show leaderboard'));
        razorpayBtn.appendChild(boardButton);

        document.getElementById('razorpayBtn').onclick=async function(e){
        
            e.preventDefault();
            const res=await axios.get('http://localhost:3000/premium/getLeaderboard',{headers:{"Authorization":token}});
            const data=res.data.resData;
        
            const heading=document.createElement('h2');
            heading.appendChild(document.createTextNode('Leaderboard'));
            leaderboardList.appendChild(heading);
            for(let i=0;i<data.length;i++){
                const li=document.createElement('li');
                li.classList.add('leaderboard-list-item')
                li.appendChild(document.createTextNode(`Name-${data[i].name}  Total Expense-${data[i].total_cost || 0}`));
                leaderboardList.appendChild(li);
            }
        }
    }

})


