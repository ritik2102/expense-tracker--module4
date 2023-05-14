const emailField=document.getElementById('email');
const passwordField=document.getElementById('password');
const loginMessage=document.querySelector('.login-message');
const passwordMessage=document.querySelector('.password-message');

function init(){
    loginMessage.style.visibility='hidden';
    passwordMessage.style.visibility='hidden';
    emailField.value="";
    passwordField.value="";
}
init();

async function login(e){
    try{
        e.preventDefault();
        // making the messages invisible again
        loginMessage.style.visibility='hidden';
        passwordMessage.style.visibility='hidden';

        const email=emailField.value;
        const password=passwordField.value;

        const credentials={
            "email":email,
            "password":password
        }
        console.log(credentials);
        axios.post('http://localhost:3000/users/user-login',credentials)
            .then(response=>{
                localStorage.setItem('token',response.data.token);
                window.location.href='expense-main.html';
            })
            .catch(err=>{
                console.log(err);
            })
        emailField.value="";
        passwordField.value="";
    }
    catch(err){
        console.log(err.response.status);
        if(err.response.status===401){
            passwordMessage.style.visibility='visible';
        }
        else if(err.response.status===404){
            loginMessage.style.visibility='visible';
        }
    }
}