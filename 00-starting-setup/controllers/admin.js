const { resolveInclude } = require('ejs');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  req.user.createProduct({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description,
    
  })
  
  
  .then(result=>{
    res.redirect('/')
  })
  .catch(err=>console.log(err))
  
};
exports.getEditProduct = (req, res, next) => {
  const productId=req.params.productId;
  
  Product.findByPk(productId)
  .then(product=>{
    
    
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product:product
    });
  })
  .catch(err=>console.log(err))
  
};
exports.postEditProduct = (req, res, next) => {
  const rbody=req.body
  
  Product.update({
    title:rbody.title,
    imageUrl:rbody.imageUrl,
    price:rbody.price,
    description:rbody.description,
    userId:req.user.id
  },{
    where:{id:rbody.id}
  })
    .then(()=>{
      res.redirect('/')
    })
    .catch(err=>console.log(err))
  
};
exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err=>console.log(err))
};

exports.getDeleteProduct=(req,res,next)=>{
  const productId=req.params.productId;
  Product.destroy({where:{id:productId}})
  .then(()=>{
    res.redirect('/')
  })
  .catch(err=>console.log(err))
  
}
