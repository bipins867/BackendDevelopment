const bodyParse=require('body-parser')
const express=require('express')
const path=require('path')


const adminRoutes=require('./Routes/admin')
const shopRoutes=require('./Routes/shop')
const contactRoutes=require('./Routes/contact')


const app=express();

app.use(bodyParse.urlencoded({extended:false}))


app.use(express.static(path.join(__dirname,'Public')))

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(contactRoutes);


app.use('/',(req,res)=>{
    //res.statusCode=404
    res.status(404).sendFile(path.join(__dirname,'Templates','PageError.html'))
})
app.listen(3000)