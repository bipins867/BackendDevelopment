const http=require('http');
const route=require('./script')

const server=http.createServer(route.handler)
console.log(route.text)

server.listen(3000);