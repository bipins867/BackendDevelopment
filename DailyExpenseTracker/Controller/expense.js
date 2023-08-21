const Expense=require('../Models/Expense')



exports.postAddExpense=(req,res,next)=>{

    const obj={amount:req.body.amount,description:req.body.description,category:req.body.category}

    Expense.create(obj)
    .then(result=>{
        res.json(result.dataValues)
    })
    .catch(err=>{
        console.log(err)
    })
}


exports.getExpenses=(req,res,next)=>{
    Expense.findAll()
    .then(result=>{
        res.json(result)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getDeleteExpense=(req,res,next)=>{
    const id=req.params.id;
    Expense.findByPk(id)
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