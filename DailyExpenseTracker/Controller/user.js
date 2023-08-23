
const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const SumExpense=require('../Models/SumExpense')

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
                bcrypt.hash(obj.password,10,async (err,passw)=>{
                    if(err)
                    console.log(err)
                    obj.password=passw
                    User.create(obj)
                    .then(async data=>{
                        const user=data.dataValues;
                        await SumExpense.create({UserId:user.id,sum:0,name:user.name})
            
                        res.json({status:"SignUp Successfull"})
                    })
                    .catch(err=>{
                        console.log(err)
                    })
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
    try
    {
        if(!loginValidation(obj))
        return res.status(405).json({error:"Invalid Credentials!"})

        const user=await User.findOne({where:{email:obj.email}})

        if(!user){
            res.status(404).json({error:"User don't Exists"})
        }
        else
        {
            bcrypt.compare(obj.password,user.password,async(err,response)=>{
                if(err)
                    throw new Error("Something went wrong")
                
                if(response)
                {
                    const token=jwt.sign({name:user.dataValues.name,id:user.dataValues.id},'SecretKey')
                    //console.log(token)
                    res.json({status:"Login Successfull",token:token})
                }
                    
                else
                res.status(401).json({error:"Invalid Password"})
            })
            
        }
    }
    catch(err){
        console.log(err)
    }
}