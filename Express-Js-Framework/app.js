const bodyParse=require('body-parser')
const express=require('express')

const app=express();

app.use(bodyParse.urlencoded({extended:false}))
app.use('/add-product',(req,res)=>{
    res.send(`
    <form method='POST' action='/message'>
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

app.use('/',(req,res)=>{
    res.send("<h1>This is default home page</h1>")
})


app.listen(3000)