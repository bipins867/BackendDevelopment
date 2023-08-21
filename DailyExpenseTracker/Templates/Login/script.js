const emailField=document.getElementById('email')
const passwordField=document.getElementById('password')

document.getElementById('login-form').addEventListener('submit',event=>{
    event.preventDefault();
    obj={
        name:nameField.value,
        email:emailField.value,
        password:passwordField.value
    }
    try{
        axios.post('http://localhost:3000/signup',obj)
        .then(result=>{
           const status=result.status;

           if(status==201){
            document.write("<b>User Already Exists</b>")
           }
           else{
            window.location='./login.html'
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