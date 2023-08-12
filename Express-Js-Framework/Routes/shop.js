const express=require('express');


const app=express.Router();

app.get('/',(req,res)=>{
    res.send("<h1>This is default home page</h1>")
})


module.exports=app;