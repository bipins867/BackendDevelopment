const sequelize=require('./database')
const Sequelize=require('sequelize')


module.exports=sequelize.define('ShopInventory',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:Sequelize.STRING,
    description:Sequelize.STRING,
    price:Sequelize.DOUBLE,
    quantity:Sequelize.INTEGER
})