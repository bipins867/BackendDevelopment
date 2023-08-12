const express=require('express');


const app=express.Router();

app.get('/add-product',(req,res)=>{
    res.send(`
    <form method='POST' action='/admin/message'>
    <input type='text' name='title' placeholder='Enter the product name'/><br>
    <input type='text' name='size' placeholder ='Product Size :-'/><br>
    <input type='submit' value='submit'/>
    </form>
    `)
})

app.post('/message',(req,res)=>{
   
    console.log(req.body)
    res.redirect('/')
})


module.exports=app;