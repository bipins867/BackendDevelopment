const emailField=document.getElementById('email')
const passwordField=document.getElementById('password')
const labelStatus=document.getElementById('status')

document.getElementById('login-form').addEventListener('submit',event=>{
    event.preventDefault();
    obj={
        email:emailField.value,
        password:passwordField.value
    }
    try{
        axios.post('http://localhost:3000/User/login',obj)
        .then(result=>{
           const status=result.status;
            
           if(status==200){
            alert("login successfull");
            labelStatus.innerHTML="<b>Login Successfull</b>"
           }
           else if(status==214){
            labelStatus.innerHTML="<b>User Don't Exists!</b>"
            
           }
           else if(status==213){
            labelStatus.innerHTML="<b>Invalid Credentials!</b>"
           
           }
           else if(status==215){
            labelStatus.innerHTML="<b>Invalid Password!</b>"
           
           }
           else{
            labelStatus.innerHTML="<b>Something Went Wrong!</b>"
           
           }
           
        })
        .catch(err=>{
            console.log("ERROR")
        })
    }
    catch(err){
        console.log(err)
    }
})