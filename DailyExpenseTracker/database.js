const Sequelize=require('sequelize')


module.exports=new Sequelize('BackendMyDB','root','bipinsingh',{
    dialect:'mysql',host:'localhost'
})