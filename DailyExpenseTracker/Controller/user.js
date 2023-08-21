
const User=require('../models/User')


function signUpValidation(obj){
    return true;
}
function loginValidation(obj){
    return true;
}

exports.postSignUp=(req,res,next)=>{
    const body=req.body;
    const email=body.email;
    const password=body.password;
    const name=body.name;
    obj={name:name,email:email,password:password}
    if(!signUpValidation(obj))
        return res.status(503).json({error:"Invalid Credentials"})
    User.findOne({where:{
        email:email
    }})
    .then(user=>{
        

        if(user){
            res.status(201).json({status:'User Already Exist'})
        }
        else
        {
            User.create(obj)
            .then(result=>{
                res.json({status:"SignUp Successfull"})
            })
            .catch(err=>{
                console.log(err)
            })
        }
    })
    .catch(err=>{
        console.log(err)
    })
    
    //res.json({id:2})
}

exports.postLogin=async(req,res,next)=>{
    obj={email:req.body.email,password:req.body.password}

    if(!loginValidation(obj))
    return res.status(405).json({error:"Invalid Credentials!"})

    const user=await User.findOne({where:{email:obj.email}})

    if(!user){
        res.status(404).json({error:"User don't Exists"})
    }
    else
    {
        if(user.password==obj.password){
            res.json({status:"Login Successfull"})
        }
        else{
            res.status(401).json({error:"Invalid Password"})
        }
    }
}