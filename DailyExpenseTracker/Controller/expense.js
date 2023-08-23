const Expense=require('../Models/Expense')



exports.postAddExpense=(req,res,next)=>{

    const obj={amount:req.body.amount,description:req.body.description,category:req.body.category,userId:req.user.id}

    req.user.createExpense(obj)
    .then(result=>{
        res.json(result.dataValues)
    })
    .catch(err=>{
        console.log(err)
    })
}


exports.getExpenses=(req,res,next)=>{
    req.user.getExpenses({where:{userId:req.user.id}})
    .then(expense=>{

        const data={expense,isPremium:req.user.isPremium}
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getDeleteExpense=(req,res,next)=>{
    const id=req.params.id;
    Expense.findOne({where:{id:id,userId:req.user.id}})
    .then(result=>{
        return result.destroy();

    })
    .then(result=>{
        res.json({status:'Successfullly Deleted'})
    })
    .catch(err=>{
        console.log(err)
    })
}