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
  product.save();
  res.redirect('/');
};
exports.getEditProduct = (req, res, next) => {
  const productId=req.params.productId;
  
  Product.findById(productId,product=>{
    
    if(!product){
      return redirect('/')

    }
    
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product:product
    });

  })
  
};
exports.postEditProduct = (req, res, next) => {
  const rbody=req.body
  
  const xproduct={
    id:rbody.id,
    title:rbody.title,
    imageUrl:rbody.imageUrl,
    description:rbody.description,
    price:rbody.price
  }

  Product.fetchAll(products=>{
    const nProduct=products.map(product=>{
      
      if (product.id==xproduct.id){
        return xproduct;
      }
      else{
        return product
      }
    })
    
    Product.saveAll(JSON.stringify(nProduct))
    res.redirect('/')
  })
  
};
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.getDeleteProduct=(req,res,next)=>{
  const productId=req.params.productId;
  Product.deleteById(productId,()=>{
    res.redirect('/')
  })
  
}
