const forgetPasswordForm=document.getElementById("forget-password")
const otpForm=document.getElementById('otpForm')
const divForm=document.getElementById("divForm")

forgetPasswordForm.onsubmit=async event=>{
    event.preventDefault();
    const email=forgetPasswordForm.email.value

    try{
        const response=await axios.post('http://localhost:3000/Password/forgetPassword',{email:email})
        
        if(response.status==200)
        {
            divForm.style.display='block';

        }
    }
    catch(err)
    {
        console.log("SOME ERROR")
    }
}

otpForm.onsubmit=async event=>{

}