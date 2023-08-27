const sequelize=require('../database')
const Sequelize=require('sequelize')


module.exports=sequelize.define('Filedownload',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    fileUrl:Sequelize.STRING,

})