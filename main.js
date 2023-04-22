const nameField=document.getElementById('name');
const emailField=document.getElementById('email');
const passwordField=document.getElementById('password');
const loginMessage=document.querySelector('.login-message');
const passwordMessage=document.querySelector('.password-message');


async function submitHandler(e){

    try{
        e.preventDefault();
    
        const name=nameField.value;
        const email=emailField.value;
        const password=passwordField.value;

        const data={
            "name":name,
            "email":email,
            "password":password
        }
        const res=await axios.post("http://localhost:3000/users/add-user",data);
        console.log(res.data.resData);
        if(res.data.resData!=="success"){
            alert("User already registered")
        }
        // window.location.reload();
    }
    catch(err){
        console.log(err);
    }
    

}

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
        const res=await axios.post('http://localhost:3000/users/user-login',credentials);
        
        console.log('Login successful');
        alert("Successful user login");
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