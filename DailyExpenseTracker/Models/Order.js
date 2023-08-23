const sequelize=require('../database')
const Sequelize=require('sequelize')

module.exports=sequelize.define('Order',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    paymentId:Sequelize.STRING,
    orderId:Sequelize.STRING,
    status:Sequelize.STRING
})