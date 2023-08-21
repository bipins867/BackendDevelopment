const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')

const db=require('./database')
const userRoutes=require('./Routes/user')
const expenseRoutes=require('./Routes/expense')

app=express()
app.use(cors())
app.use(bodyParser.json({extends:false}))



app.use('/User',userRoutes)
app.use('/Expense',expenseRoutes)
app.use('/',(req,res,next)=>{
    res.status(404).json({err:"Page not found"})
})

db.sync({alter:true})
.then(()=>{
    
app.listen(3000)
})
.catch(err=>console.log(err))