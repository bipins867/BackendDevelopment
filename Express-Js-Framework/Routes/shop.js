const express=require('express');
const path=require('path');

const app=express.Router();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../','Templates','index.html'))
})


module.exports=app;