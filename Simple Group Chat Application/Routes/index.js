const express=require('express')
const fs=require('fs')

const app=express.Router();

app.post('/save',(req,res)=>{
    var data=req.body.msg;
    fs.writeFileSync('./Routes/message.txt',data,{flag:'a'})
    res.redirect('/')
})

app.get('/',(req,res)=>{
    var data=fs.readFileSync('./Routes/message.txt','utf-8');
    res.send(`
    <html>
    <body>
    ${data}
    <br>
    <form id='form' method='POST' action='/save'>
        <input type='text' name='msg'/>
        <input type='submit' value='submit'/>
    </form>
    <script>
     var userName=localStorage.getItem('userName')
     const form=document.getElementById('form')

     form.addEventListener('submit',(event)=>{
        form.msg.value=userName+'='+form.msg.value+'<br>';
     })
    </script>
    </body>
    </html>
    `)
})




module.exports=app;