const bodyParse=require('body-parser')
const express=require('express')

const adminRoutes=require('./Routes/admin')
const shopRoutes=require('./Routes/shop')


const app=express();

app.use(bodyParse.urlencoded({extended:false}))

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use('/',(req,res)=>{
    //res.statusCode=404
    res.status(404).send('<h1>Page not found 404 !</h1>')
})
app.listen(3000)