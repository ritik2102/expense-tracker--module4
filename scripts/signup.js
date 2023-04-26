const nameField=document.getElementById('name');
const emailField=document.getElementById('email');
const passwordField=document.getElementById('password');
const emailMessage=document.querySelector('.email-message');


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
        window.location.reload();
    }
    catch(err){
        console.log(err);
    }
    

}

function init(){
    emailMessage.style.visibility='hidden';
    emailField.value="";
    passwordField.value="";
}
init();

