const Sequelize=require('sequelize')
const sequelize=require('../util/database')

const Product=sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  title:Sequelize.STRING,
  price:Sequelize.DOUBLE,
  imageUrl:Sequelize.STRING,
  description:Sequelize.STRING
})


module.exports=Product