
const User=require('../models/User')
exports.getSignUp=(req,res,next)=>{
    res.json({id:1})
}



exports.postSignUp=(req,res,next)=>{
    const body=req.body;
    const email=body.email;
    const password=body.password;
    const name=body.name;
    obj={name:name,email:email,password:password}
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