const Expense=require('../Models/Expense')
const SumExpense=require('../Models/SumExpense')



exports.postAddExpense=(req,res,next)=>{

    const obj={amount:req.body.amount,description:req.body.description,category:req.body.category,userId:req.user.id}

    Promise.all([req.user.createExpense(obj),req.user.getSumexpense()])
    .then(([result1,result2])=>{
        
       const amount=parseFloat(result2.sum)+parseFloat(obj.amount);
       res.json(result1.dataValues)
       return result2.update({sum:amount})
        
    })
    .then(()=>{})
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

exports.getDeleteExpense=async(req,res,next)=>{
    const id=req.params.id;
    const expenseResult=await Expense.findOne({where:{id:id,userId:req.user.id}})
    const sumexpenseResult=await SumExpense.findOne({where:{userId:req.user.id}})
        
    const amount=parseFloat(sumexpenseResult.sum)-parseFloat(expenseResult.amount)
    
    await sumexpenseResult.update({sum:amount})

    await expenseResult.destroy();

    res.json({status:"Transaction Deleted Successfully"})


}