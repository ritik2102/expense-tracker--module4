const recoverButton=document.getElementById('reset');
const emailField=document.getElementById('email');
const passwordResetSent=document.getElementById('password-reset-sent');
recoverButton.onclick=async(e)=>{
    e.preventDefault();

    const email=emailField.value;
    const data={
        "email":email
    }
    const res=await axios.post('http://localhost:3000/password/forgotPassword',data);
    console.log('11');
    const result=res.data.success;
    console.log(result);
    if(result===true){
        console.log(result);
        passwordResetSent.style.visibility='visible';
    }
}  

function init(){
    try{
        passwordResetSent.style.visibility='hidden';
    } catch(err){
        throw new Error(err);
    }
}

init();