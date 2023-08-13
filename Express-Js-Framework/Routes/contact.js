const express=require('express');
const path=require('path')


const app=express.Router();


app.get('/contact',(req,res)=>{
   res.sendFile(path.join(__dirname,'../','Templates','contactus.html'))
})

app.post('/contact',(req,res)=>{
   
    console.log(req.body)
    res.sendFile(path.join(__dirname,'../','Templates','success.html'))
})


module.exports=app;