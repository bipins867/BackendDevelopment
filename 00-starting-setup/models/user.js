const Sequelize=require('sequelize')
const sequelize=require('../util/database')






module.exports=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    name:Sequelize.STRING,
    email:Sequelize.STRING
})