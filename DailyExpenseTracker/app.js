
require('dotenv').config()

const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')


const db=require('./database')
const userRoutes=require('./Routes/user')
const expenseRoutes=require('./Routes/expense')
const purchaseRoutes=require('./Routes/purchase')
const premimumRoutes=require('./Routes/premium')
const passwordRoutes=require('./Routes/password')

const User=require('./models/User')
const Expense=require('./Models/Expense')
const Order=require('./Models/Order')
const SumExpense=require('./Models/SumExpense')


app=express()

app.use(cors())
app.use(bodyParser.json({extends:false}))


User.hasOne(SumExpense)
SumExpense.belongsTo(User)

User.hasMany(Expense)
Expense.belongsTo(User)


User.hasMany(Order)
Order.belongsTo(User)

app.use('/User',userRoutes)
app.use('/Expense',expenseRoutes)
app.use('/Purchase',purchaseRoutes)
app.use('/Premium',premimumRoutes)
app.use('/Password',passwordRoutes)

app.use('/',(req,res,next)=>{
    res.status(404).json({err:"Page not found"})
})

db.sync()
.then(()=>{
    
app.listen(3000)
})
.catch(err=>console.log(err))