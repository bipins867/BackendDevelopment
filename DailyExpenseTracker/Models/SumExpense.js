const sequelize=require('../database')
const Sequelize=require('sequelize')

module.exports=sequelize.define('Sumexpense',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    sum:Sequelize.DOUBLE,
    name:Sequelize.STRING,
})