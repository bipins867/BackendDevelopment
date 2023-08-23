
const SumExpense=require('../Models/SumExpense')

exports.fetchLeaderboard=async(req,res,next)=>{
    
    const result=await SumExpense.findAll({
        attributes: ['id', 'name', 'sum'],
        order:[['sum','DESC']]})
    
    res.json(result)
}