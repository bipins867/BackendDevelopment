const Sequelize=require('sequelize');

const sequelize=new Sequelize('mydb','root','bipinsingh',
    {dialect:'mysql',host:'localhost'});


module.exports=sequelize;