const expenseList=document.getElementById('expense-list');

const token=localStorage.getItem('token');

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
        }
        catch(err){
            console.log(err);
        }
})


