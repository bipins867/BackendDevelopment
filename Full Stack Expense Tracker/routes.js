const expense=require('./models')



exports.postAddProudct=(req,res,next)=>{
    
    const data=req.body;

    expense.create(data)
    .then(result=>{
        res.json(result.dataValues)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getAddProudct=(req,res,next)=>{
    expense.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.postEditProudct=(req,res,next)=>{
    const id=req.params.id;
    const data=req.body;
    expense.update(data,{
        where:{id:id}
    })
    .then(xres=>{

        expense.findByPk(id)
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

exports.getDeleteProudct=(req,res,next)=>{
    const id=req.params.id;

    expense.destroy({where:{id:id}})
    .then(response=>{
        res.json({status:200})
    })
    .catch(err=>{
        console.log(err)
    })
}


