const express=require('express')
const bodyParser=require('body-parser')
const db=require('./database')
const routes=require('./routes')
const cors=require('cors')

app=express()
app.use(cors())
app.use(bodyParser.json({extends:false}))

app.post('/add-product',routes.postAddProudct)
app.get('/get-product',routes.getAddProudct)
app.post('/edit-product/:id',routes.postEditProudct)
app.get('/delete-product/:id',routes.getDeleteProudct)



app.use('/',(req,res)=>{
    res.send("HELLO WORLD")
})

db.sync()
.then(()=>{
    
app.listen(3000)
})
.catch(err=>console.log(err))
