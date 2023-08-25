
const MailService=require('../Utils/MailService')

const otpList={}


exports.forgetPassword=async(req,res,next)=>{
    try{
        
        
        const email=req.user.email;
        const otp=MailService.generateOtp(1000,10000)
        const subject="Otp for Forget Password"
        const body=`Your otp for your email:-  ${email}  is  ${otp}`
        const result=await MailService.sendMail(email,subject,body)
       
        if (result){
            otpList[email]=otp;

            res.json({status:"Otp Sent Successfully"})
            setTimeout(()=>{
                delete otpList[email]
            },60*2*1000)
        }
        else
        {
            throw new Error("Somehting went wrong")
        }
    }
    catch(err)
    {
        res.status(500).json({error:'Something went Wrong!'})
    }
   
}

exports.submitOtp=async(req,res,next)=>{
    
}