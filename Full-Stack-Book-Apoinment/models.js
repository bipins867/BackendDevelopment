const Sequelize=require('sequelize')
const sequelize=require('./database')



const User=sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        
    },
    name:Sequelize.STRING,
    phone:Sequelize.STRING,
    email:Sequelize.STRING
})

module.exports=User