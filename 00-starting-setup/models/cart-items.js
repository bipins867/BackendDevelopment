const Sequelize=require('sequelize')
const sequelize=require('../util/database')


module.exports=sequelize.define('cartItem',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    quantity:Sequelize.INTEGER
})