const Expense=require('../Models/Expense')
const SumExpense=require('../Models/SumExpense')
const sequelize=require('../database')


exports.postAddExpense=async (req,res,next)=>{
    const transaction=await sequelize.transaction();
    try{
        
        
        const transaction=await sequelize.transaction()

        const obj={amount:req.body.amount,description:req.body.description,category:req.body.category,userId:req.user.id}

        const result1=await req.user.createExpense(obj,{transaction:transaction})
        const result2=await req.user.getSumexpense({transaction:transaction})
        
        const amount=parseFloat(result2.sum)+parseFloat(obj.amount);
        
        await result2.update({sum:amount},{transaction:transaction})
        res.json(result1.dataValues)
        await transaction.commit();
    }
    catch(err)
    {   
        await transaction.rollback();
        res.status(500).json({error:"Something went wrong"})
    }
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
    const transaction=await sequelize.transaction();
    try{
        
            
        const id=req.params.id;
        const expenseResult=await Expense.findOne({where:{id:id,userId:req.user.id},transaction:transaction})
        const sumexpenseResult=await SumExpense.findOne({where:{userId:req.user.id},transaction:transaction})
            
        const amount=parseFloat(sumexpenseResult.sum)-parseFloat(expenseResult.amount)
        
        await sumexpenseResult.update({sum:amount},{transaction:transaction})

        await expenseResult.destroy({transaction:transaction});

        res.json({status:"Transaction Deleted Successfully"})
        await transaction.commit()

    }
    catch(err){
        res.status(500).json({error:"Something went wrong"})
        await transaction.rollback()
    }
}