
const MailService=require('../Utils/MailService')
const ForgetPasswordRequest=require('../Models/ForgotPasswordRequest')
const uuid=require('uuid')
const sequelize=require('../database')
const path=require('path')
const User=require('../Models/User')
const bcrypt=require('bcrypt')


exports.forgetPassword=async(req,res,next)=>{
    const transaction=await sequelize.transaction();

    try{
        
        
        const email=req.user.email;
        const uids=uuid.v4();
        const link=`http://localhost:3000/Password/resetPassword/${uids}`
        const subject="Reset Password"
        const body=`Your reset link is :-\n \n${link}`
        const result1=await MailService.sendMail(email,subject,body)
        
        const result2=await ForgetPasswordRequest.create({UserId:req.user.id,uuids:uids,isactive:true})
        
        if (result1 && result2){
            
            transaction.commit();
            res.json({status:"Reset link Sent Successfully"})
        }
        else
        {
            throw new Error("Somehting went wrong")
        }
    }
    catch(err)
    {   
        console.log(err)
        transaction.rollback();
        res.status(500).json({error:'Something went Wrong!'})
    }
   
}

exports.resetPassword=async(req,res,next)=>{
    const fpr=req.ForgetPasswordRequest;
    const uuid=req.params.uuid;
    try{
        const result=await fpr.update({isactive:false})
        
        res.send(`
                <form id='form' action='/Password/updatePassword/${uuid}'>
                <label>Enter the password</label>
                <input type='password' name='password' id='password'>
                <input type='submit' value='submit'>

                </form>
        
        `)
    }
    catch(err)
    {
        
        res.send("<h1>Somehting went wrong</h1>")
    }

    res.end();

}

exports.getUpdatePassword=async(req,res,next)=>{
    const uuid=req.params.uuid;
    const password=req.query.password;
    try{

        const forgetPassword=await ForgetPasswordRequest.findOne({where:{uuids:uuid}})
        
        const user=await User.findOne({id:forgetPassword.userId})
        const passwordHash=await bcrypt.hash(password,10)
        await user.update({password:passwordHash})
        res.send("Password Reset Successfully!")
    }
    catch(err)
    {
        console.log(err)
        res.send("Soemthing went wrong")
    }
    res.end();
}


