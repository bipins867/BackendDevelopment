const jwt=require('jsonwebtoken')
const User=require('../models/User')


exports.authenticate=(req,res,next)=>{
    //console.log("Headers",req.headers.authorization);
    try{
        const token=req.headers.authorization;
        const payload=jwt.verify(token,'SecretKey')
        User.findByPk(payload.id)
        .then(user=>{
            req.user=user;
            next();
        })
        .catch(err=>{
            return res.status(504).json({error:"Invalid User"})
        })
        
        
    }
    catch(err){
        return res.status(503).json({error:"Invalid Signature"})
    }
}