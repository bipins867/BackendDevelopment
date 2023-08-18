const Sequelize=require('sequelize')

module.exports=new Sequelize('mydb','root','bipinsingh',
    {dialect:'mysql',host:'localhost'})