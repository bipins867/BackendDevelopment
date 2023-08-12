const express=require('express')
const bodyParser=require('body-parser')
const loginRoutes=require('./Routes/login')
const indexRoutes=require('./Routes/index')


const app=express();
app.use(bodyParser.urlencoded({extended:false}))


app.use(loginRoutes)
app.use(indexRoutes)



app.use('/',(req,res)=>{
    res.status(404).send('<h1>404 Page not found</h1>')
})
app.listen(3000);