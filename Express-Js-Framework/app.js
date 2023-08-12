
const express=require('express')

const app=express();

app.use((req,res,next)=>{
    console.log("----------------")
    console.log("Start MidWare");
    next();
})

app.use((req,res,next)=>{

    console.log("End MidWare");
    res.send({key:"hello1"})
})


app.listen(3000)