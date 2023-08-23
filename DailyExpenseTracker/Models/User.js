const Sequelize=require('sequelize')
const sequelize=require('../database')

module.exports=sequelize.define('User',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        unique:true,
    },
    password:Sequelize.STRING,
    isPremium:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
})