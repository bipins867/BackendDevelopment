const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')
const path=require('path')
const sequelize=require('./database')

const routes=require('./routes')

app=express();
app.use(cors())


app.use(bodyParser.json({extends:false}))

app.post('/user/add-user',routes.postAddUser)
app.get('/user/get-user',routes.getAddUser)
app.get('/user/delete-user/:id',routes.getDeleteById)
app.post('/user/edit-user/:id',routes.postEditById)


app.use('/',(req,res)=>{
    res.json({error:404})
})


sequelize.sync()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Core Enabled Server")
    })
    
})
.catch(err=>console.log(err))

