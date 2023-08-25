const User=require('../Models/User')
const ForgetPasswordRequest=require('../Models/ForgotPasswordRequest')

exports.authenticate=async(req,res,next)=>{
    
    const email=req.body.email;
    try{
        const user=await User.findOne({where:{email:email}})
        if(!user){
            throw new Error("Something went wrong")

        }
        
        req.user=user
        next();
    }
    catch(err){
        res.status(501).json({error:"Something went wrong"})
    }
    
}
exports.authenticateResetLink=async(req,res,next)=>{
    const uuids=req.params.uuid;
    try{
        
        const result=await ForgetPasswordRequest.findOne({where:{uuids:uuids}})
        if(!result){
            throw new Error("Something went wrong")
        }
        
        
        
        if(result.isactive)
        {
            req.ForgetPasswordRequest=result;
            next();
        }
        else
        {
            res.status(502).json({error:"Link is already expired!"})
        }
        
    }
    catch(err){
        res.status(501).json({error:"Soemthing Went wrong .."})
    }
}