const nameField=document.getElementById('name')
const emailField=document.getElementById('email')
const passwordField=document.getElementById('password')
const labelStatus=document.getElementById('status')

document.getElementById('signup-form').addEventListener('submit',event=>{
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
            labelStatus.innerHTML="<b>User Already Exists</b>"
           }
           else{
            window.location='../Login/index.html'
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