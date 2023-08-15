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
  const product = new Product(title, imageUrl, description, price);
  product.save().then(()=>{
    res.redirect('/');
  }).catch();
  
};
exports.getEditProduct = (req, res, next) => {
  const productId=req.params.productId;
  
  Product.findById(productId)
  .then(([rowAll,xdata])=>{
    let product=rowAll[0]
    
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
  
  const product=new Product(rbody.title,rbody.imageUrl,
    rbody.description,rbody.price )
    product.id=rbody.id;
    product.updateProduct()
    .then(()=>{
      res.redirect('/')
    })
    .catch(err=>console.log(err))
  
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(([products,xdata])=>{
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
  Product.deleteById(productId)
  .then(()=>{
    res.redirect('/')
  })
  .catch(err=>console.log(err))
  
}
