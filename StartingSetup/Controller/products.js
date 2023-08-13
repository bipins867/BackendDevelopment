const products=[]
exports.getAddProducts= (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }


  exports.postAddProducts=(req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
  }

  exports.getProducts=(req, res, next) => {
    
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }

  exports.getErrorPage=(req, res, next) => {
    res.status(404).render('404', {
         pageTitle: 'Page Not Found',
         path:'/'
         });
  }

  exports.getContactPage=(req,res,next)=>{
    res.render('contactus', {
        pageTitle: 'Contact Us',
        path:'/'
        });
  } 
  exports.getSuccessPage=(req,res,next)=>{
    res.render('success', {
        pageTitle: 'Success',
        path:'/'
        });
  }
  exports.postSuccessPage=(req,res,next)=>{
    res.redirect('/success')
  }