const sequelize=require('../database')
const Sequelize=require('sequelize')


module.exports=sequelize.define('Expense',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    amount:Sequelize.DOUBLE,
    description:Sequelize.STRING,
    category:Sequelize.STRING
})