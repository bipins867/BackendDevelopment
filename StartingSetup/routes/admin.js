const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const productsController=require('../Controller/products')

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product',productsController.getAddProducts);

// /admin/add-product => POST
router.post('/add-product', productsController.postAddProducts);

module.exports=router