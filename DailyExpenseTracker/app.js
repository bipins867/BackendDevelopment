
require('dotenv').config()

const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const path=require('path')
const helmet=require('helmet')
const fs=require('fs')
const morgan=require('morgan')


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
const ForgetPasswordRequest=require('./Models/ForgotPasswordRequest')
const FileDownload=require('./Models/FileDownload')


app=express()

const fileSystem=fs.createWriteStream(
    './access.log',
    {flags:'a'}
)

app.use(helmet())
app.use(morgan('combined',{stream:fileSystem}))
//app.use(express.static(path.join(__dirname, 'Public')));

app.use(cors())
app.use(bodyParser.json({extends:false}))


User.hasOne(SumExpense)
SumExpense.belongsTo(User)

User.hasMany(Expense)
Expense.belongsTo(User)


User.hasMany(Order)
Order.belongsTo(User)


User.hasMany(ForgetPasswordRequest)
ForgetPasswordRequest.belongsTo(User)

User.hasMany(FileDownload)
FileDownload.belongsTo(User)


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
    
app.listen(process.env.APP_PORT)
})
.catch(err=>console.log(err))