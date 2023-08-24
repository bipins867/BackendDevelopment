
const SumExpense=require('../Models/SumExpense')
const Expense=require('../Models/Expense')
const User=require('../Models/User')

const sequelize=require('../database')

exports.fetchLeaderboard=async(req,res,next)=>{

     
    // const data=await Expense.findAll({
    //     attributes:['UserId',[sequelize.fn('sum',sequelize.col('amount')),'total_amount']],
    //     group:['UserId'],
    //     order:[['total_amount','DESC']]
    // })
    // console.log(data)

    const result=await SumExpense.findAll({
        attributes: ['id', 'name', 'sum'],
        order:[['sum','DESC']]})
    
    res.json(result)
}