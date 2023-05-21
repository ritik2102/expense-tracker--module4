const expenseList=document.getElementById('expense-list');
const razorpayBtn=document.getElementById('razorpayBtn');
const token=localStorage.getItem('token');

const leaderboardList=document.getElementById('leaderboardList');

function logData(record){
    
    const price=record.price;
    const name=record.name;
    const category=record.category;
    const id=record.id;
    
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(`${name}  ${price} (${category})----`));
    li.classList.add('expenses');

    const deleteButton=document.createElement('button');
    deleteButton.classList.add(record.id);
    deleteButton.appendChild(document.createTextNode('Delete'));

    deleteButton.onclick= async()=>{
        try{
            const res=await axios.post(`http://localhost:3000/expense/delete-expense/${id}`,'',{headers:{"Authorization":token}});
            console.log(res.data.resData);
            window.location.reload();

        }
        catch(err){
            console.log(err);
        }
    }
    li.appendChild(deleteButton);
    expenseList.appendChild(li);

}

window.addEventListener('DOMContentLoaded',async()=>{
    try{
        const res=await axios.get('http://localhost:3000/expense/get-expense',{headers:{"Authorization":token}});
        res.data.resData.forEach((record)=>{

            const day=new Date();
            const date=day.getDate();
            const month=day.getMonth();
            const year=day.getFullYear();
        
                if( Number(record.month)===month && Number(record.year)===year){
                    logData(record);
                }
            });
            // const token=localStorage.getItem('token');
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
        }
        catch(err){
            console.log(err);
        }
})


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

