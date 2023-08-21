const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')

const db=require('./database')
const signUpRoutes=require('./Routes/signUp')

app=express()
app.use(cors())
app.use(bodyParser.json({extends:false}))



app.use('/',signUpRoutes)
app.use('/',(req,res,next)=>{
    res.status(404).json({err:"Page not found"})
})

db.sync()
.then(()=>{
    
app.listen(3000)
})
.catch(err=>console.log(err))