const mysql=require('mysql2')

const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    database:'myDb',
    password:'bipinsingh'

})

module.exports=pool.promise();