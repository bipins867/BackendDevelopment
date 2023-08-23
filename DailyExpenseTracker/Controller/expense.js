const Expense=require('../Models/Expense')
const SumExpense=require('../Models/SumExpense')



exports.postAddExpense=(req,res,next)=>{

    const obj={amount:req.body.amount,description:req.body.description,category:req.body.category,userId:req.user.id}

    Promise.all([req.user.createExpense(obj),req.user.getSumexpense()])
    .then(([result1,result2])=>{
        
        if(result2)
        {
            const amount=parseFloat(result2.sum)+parseFloat(obj.amount);
            result2.update({sum:amount})
            .then(()=>{

            })
            .catch(err=>{
                console.log(err)
            })
        }
        else
        {
            req.user.createSumexpense({userId:req.user.id,sum:obj.amount,name:req.user.name})
            .then((result)=>{
                console.log("Created")
            })
            .catch(err=>{
                console.log(err)
            })
        }
        

        res.json(result1.dataValues)
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
        SumExpense.findOne({where:{userId:req.user.id}})
        .then(sumexpense=>{
            const amount=parseFloat(sumexpense.sum)-parseFloat(result.amount)
            return sumexpense.update({sum:amount})

        })
        .then(res=>{
            
        })
        .catch(err=>{
            console.log(err)
        })
        return result.destroy();

    })
    .then(result=>{
        res.json({status:'Successfullly Deleted'})
    })
    .catch(err=>{
        console.log(err)
    })
}