const expenseList = document.getElementById('expense-list');
const razorpayBtn = document.getElementById('razorpayBtn');
const token = localStorage.getItem('token');
const dateField = document.getElementById('date-field');
const monthField = document.getElementById('month-field');
const yearField = document.getElementById('year-field');
const expensesHeading=document.getElementById('expenses-heading');
const expenseTable = document.getElementById('expense-table');


const leaderboardList = document.getElementById('leaderboardList');

async function getExpenses(e) {

    e.preventDefault();

    const date = dateField.value;
    const month = monthField.value
    const year = yearField.value;

    const monthName=['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];

    const dateHead=document.createElement('p');
    dateHead.appendChild(document.createTextNode(`${date} ${monthName[month]} ${year}`));

    const lineBreak=document.createElement('br');
    expensesHeading.appendChild(lineBreak);
    expensesHeading.appendChild(dateHead);

    const res = await axios.get('http://localhost:3000/expense/get-expense', { headers: { "Authorization": token } });

    let netExpenses=0;
    let netSavings=0;
    let i = -1;
    res.data.resData.forEach((record) => {
        i++;
        
        if (Number(record.date) === Number(date) && Number(record.month) + 1 === Number(month) && Number(record.year) === Number(year)) {
            if(record.name===null){
                netSavings+=record.price;
            }
            else{
                netExpenses+=record.price;
            }
            logData(record, i);
        }
    });
    const netMoney=document.createElement('h2');
    if(netSavings-netExpenses>=0){
        netMoney.appendChild(document.createTextNode(`Net savings- ${netSavings-netExpenses}`));
    }
    else{
        netMoney.appendChild(document.createTextNode(`Net expenses- ${netExpenses-netSavings}`));
    }
    const netMoneyField=document.getElementById('net-money');
    netMoneyField.appendChild(netMoney);

}

function logData(record, i) {

    try {
        const price = record.price;
        const name = record.name;
        const category = record.category;
        const id = record.id;

        const tableRow = document.createElement('tr');
        const deleteData=document.createElement('td');
        deleteData.classList.add('delete-field');

        if (name === null) {
            const descriptionData = document.createElement('td');
            descriptionData.appendChild(document.createTextNode(`Salary`));
            const categoryData = document.createElement('td');
            categoryData.appendChild(document.createTextNode(`Salary`));
            const incomeData = document.createElement('td');
            incomeData.appendChild(document.createTextNode(`${price}`));
            const expenseData = document.createElement('td');
            expenseData.appendChild(document.createTextNode(``));

            tableRow.appendChild(descriptionData);
            tableRow.appendChild(categoryData);
            tableRow.appendChild(incomeData);
            tableRow.appendChild(expenseData);
            tableRow.appendChild(deleteData);
        }
        else {
            const descriptionData = document.createElement('td');
            descriptionData.appendChild(document.createTextNode(`${name}`));
            const categoryData = document.createElement('td');
            categoryData.appendChild(document.createTextNode(`${category}`));
            const incomeData = document.createElement('td');
            incomeData.appendChild(document.createTextNode(``));
            const expenseData = document.createElement('td');
            expenseData.appendChild(document.createTextNode(`${price}`));

            tableRow.appendChild(descriptionData);
            tableRow.appendChild(categoryData);
            tableRow.appendChild(incomeData);
            tableRow.appendChild(expenseData);
            tableRow.appendChild(deleteData);
        }

        expenseTable.appendChild(tableRow);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add(record.id);
        deleteButton.classList.add('delete-button');

        deleteButton.appendChild(document.createTextNode('Delete'));

        deleteButton.onclick = async () => {
            try {
                let res;
                if(name===null){
                    res = await axios.post(`http://localhost:3000/expense/delete-salary/${id}`, '', { headers: { "Authorization": token } });
                }
                else{
                    res = await axios.post(`http://localhost:3000/expense/delete-expense/${id}`, '', { headers: { "Authorization": token } });
                }
                if(res.data.resData==='success'){
                    expenseTable.removeChild(tableRow);
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        deleteData.appendChild(deleteButton);
    }
    catch (err) {
        throw new Error(err);
    }

}


window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await axios.get('http://localhost:3000/purchase/premiumOrNot', { headers: { "Authorization": token } });
        const isPremium = response.data.isPremium;
        if (isPremium === 'true') {
            razorpayBtn.innerHTML = 'Premium User 👑';
            razorpayBtn.classList.add('premiumButton');

            const boardButton = document.getElementById('leader-board');
            boardButton.classList.add('boardButton');

            boardButton.onclick = async function (e) {

                e.preventDefault();
                const res = await axios.get('http://localhost:3000/premium/getLeaderboard', { headers: { "Authorization": token } });
                const data = res.data.resData;

                const heading = document.createElement('h2');
                heading.appendChild(document.createTextNode('Leaderboard'));
                leaderboardList.appendChild(heading);
                for (let i = 0; i < data.length; i++) {
                    const li = document.createElement('li');
                    if (i % 2 === 0) {
                        li.classList.add('leaderboard-list-item-even')
                    }
                    else {
                        li.classList.add('leaderboard-list-item-odd')
                    }
                    li.appendChild(document.createTextNode(`Name-${data[i].name}  Total Expense-${data[i].total_expense}`));
                    leaderboardList.appendChild(li);
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
})

document.getElementById('razorpayBtn').onclick = async function (e) {
    try {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/purchase/premiumMembership', { headers: { "Authorization": token } });

        var options = {
            "key": response.data.key_id,//key id generated from the dashboard
            "order_id": response.data.order.id,//order id for a particular order
            "handler": async function (response) {
                await axios.post('http://localhost:3000/purchase/updateTransactionStatus', {
                    order_id: options.order_id,
                    payment_id: response.razorpay_payment_id
                }, { headers: { "Authorization": token } });

                alert("You are a premium user now");
                window.location.reload();
            }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();
        e.preventDefault();

        rzp1.on("payment.failed", function (response) {
            console.log(response);
            alert("Something went wrong");
        });
    }
    catch (err) {
        throw new Error(err);
    }
}




