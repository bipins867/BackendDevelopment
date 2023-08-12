const express=require('express')


const app=express.Router();

app.get('/login',(req,res)=>{
    res.send(`
    <html>
    <body>

    <form id='form' method='POST' action='/login'>
        <input type='text' name='username'/>
        <input type='submit' value='submit'/>
    </form>
    <script>
        
        const form=document.getElementById('form')
        
        form.addEventListener('submit',(event)=>{
            
            var name=form.username.value;
            localStorage.setItem('userName',name);
        })

    </script>
    </body>
    </html>
    `)
})

app.post('/login',(req,res)=>{
    const data=req.body;
    res.redirect('/')
})




module.exports=app;