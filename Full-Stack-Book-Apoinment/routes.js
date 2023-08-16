
const { response } = require('express');
const User=require('./models')

exports.postAddUser=(req,res,next)=>{
    
    const data=req.body;
    User.create({
        name:data.name,
        phone:data.phone,
        email:data.email
    })
    .then(result=>{
        
        res.json(result.dataValues)

    })
    .catch(err=>{
        console.log(err)
    })

}

exports.getAddUser=(req,res,next)=>{
 
    User.findAll()
    .then(response=>{
        res.json(response)
    })
    .catch(err=>console.log(err))
}


exports.getDeleteById=(req,res,next)=>{
    const id=req.params.id;
    User.destroy({where:{id:id}})
    .then(response=>{
        
        res.json({status:200})
    })
    .catch(err=>{
        res.json({error:err})
    })
}

exports.postEditById=(req,res,next)=>{
    const data=req.body;
    const id=req.params.id;
    
    User.update(
        data,
        {where:{id:id}})
    .then(xres=>{
        User.findByPk(id)
        .then(response=>{
            res.json(response)
        })
        .catch(err=>{
            console.log(err)
        })
    })
    .catch(err=>{
        console.log(err)
    })
}