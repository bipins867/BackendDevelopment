const Sequelize=require('sequelize')

const sequelize=new Sequelize('myDb','root','bipinsingh',
    {dialect:'mysql',host:'localhost'})


module.exports=sequelize;