const forgetPasswordForm=document.getElementById("forget-password")
const otpForm=document.getElementById('otpForm')
const divForm=document.getElementById("divForm")

forgetPasswordForm.onsubmit=async event=>{
    event.preventDefault();
    const email=forgetPasswordForm.email.value
    divForm.style.display='block';
    try{
        const response=await axios.post('http://localhost:3000/Password/forgetPassword',{email:email})
       
        document.getElementById('pid1').style.display='block'
        
        
        
    }
    catch(err)
    {
        if(err.status==501){
            
            document.getElementById('pid2').style.display='block'
        }
        else{
            
            document.getElementById('pid3').style.display='block'
        }
    }
    forgetPasswordForm.email.value=''
}

