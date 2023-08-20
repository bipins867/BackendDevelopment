const nameField=document.getElementById('name')
const emailField=document.getElementById('email')
const passwordField=document.getElementById('password')

document.getElementById('signup-form').addEventListener('submit',event=>{
    event.preventDefault();
    obj={
        name:nameField.value,
        email:emailField.value,
        password:passwordField.value
    }

    axios.post('http://localhost:3000/signup',obj)
    .then(result=>{
        console.log(result)
    })
    .catch(err=>{
        console.log("ERROR")
    })
})