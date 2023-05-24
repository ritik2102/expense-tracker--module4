const recoverButton=document.getElementById('reset');
const emailField=document.getElementById('email');
recoverButton.onclick=async(e)=>{
    e.preventDefault();
    const email=emailField.value;
    const data={
        "email":email
    }
    await axios.post('http://localhost:3000/password/forgotPassword',data);
}  