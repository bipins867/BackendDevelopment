const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const productsController=require('./Controller/products')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData);
app.use(shopRoutes);

app.get('/contact',productsController.getContactPage);
app.get('/success',productsController.getSuccessPage);
app.post('/success',productsController.postSuccessPage)
app.use(productsController.getErrorPage);

app.listen(3000);
