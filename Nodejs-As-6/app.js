const http=require('http');
const fs=require('fs')

const server=http.createServer((req,res)=>{
    const url=req.url;
    const method=req.method;

    if (url=='/'){
        const data=fs.readFileSync('Hello.txt','utf-8');
        res.write('<html><body><form action="/message" method="POST" id="form">')

        res.write("<label id='label'>"+data+"</label><br><input type='text' name='msg'/><input type='submit' value='sumbit'/></form>")
        res.write('</body></html>')
        return res.end();
    }

    if(url=='/message' && method=='POST'){

        const body=[];

        req.on('data',chunk=>{
            body.push(chunk);
        })

        req.on('end',()=>{

            const parseData=Buffer.concat(body).toString();
            
            var data=parseData.split('=')[1];
            
            fs.writeFileSync('Hello.txt',data);

        })


        res.setHeader('Location','/')
        res.statusCode='302'
        res.end();
    }
})


server.listen(3000);