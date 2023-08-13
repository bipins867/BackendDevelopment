const express=require('express');
const path=require('path')


const app=express.Router();


app.get('/add-product',(req,res)=>{
   res.sendFile(path.join(__dirname,'../','Templates','admin.html'))
})

app.post('/message',(req,res)=>{
   
    console.log(req.body)
    res.redirect('/')
})


module.exports=app;