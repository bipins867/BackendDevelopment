const sequelize=require('../database')
const Sequelize=require('sequelize')

module.exports=sequelize.define('Forgetpasswordrequest',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    uuids:Sequelize.STRING,
    isactive:Sequelize.BOOLEAN
})