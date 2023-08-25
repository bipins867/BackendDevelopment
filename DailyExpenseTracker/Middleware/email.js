const User=require('../Models/User')


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