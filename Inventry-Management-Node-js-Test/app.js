const express=require('express')
const bodyParser=require('body-parser')
const db=require('./database')
const routes=require('./routes')
const cors=require('cors')

app=express()
app.use(cors())
app.use(bodyParser.json({extends:false}))


app.get('/getProducts',routes.getProducts)
app.post('/addProduct',routes.postAddProduct)
app.post('/editProduct/:id',routes.postEditProduct)
app.post('/buyProduct/:id',routes.postBuyProduct)




db.sync()
.then(()=>{
    
app.listen(3000)
})
.catch(err=>console.log(err))