const http=require('http');

const server=http.createServer((req,res)=>{
    const url=req.url;

    if(url=='/home'){
        res.write('<b>Welcome Home</b>')
    }
    
    else if(url=='/about'){
        res.write('<b>Welcom to about us</b>')
    }
    
    else if(url=='/node'){
        res.write('<b>Welcome to my node js project</b>')
    }
    else{
        res.write('Page 404 not found')
    }
    res.end()
})


server.listen(3000);