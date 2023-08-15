const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);



const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id=new Date().getTime();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static saveAll(data){
    fs.writeFileSync(p,data)
    
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb){
   getProductsFromFile(product=>{
    const prodId=product.find(product=>id==product.id)
    cb(prodId)
   })
   
  }

  static deleteById(id,cb){
    fs.readFile(p,'utf-8',(err,data)=>{
      if(!err){

        let pdata=JSON.parse(data)

        let index=pdata.findIndex(product=>product.id==id)
        pdata.splice(index,1)
        Product.saveAll(JSON.stringify(pdata))
        cb()

      }
      else{
        console.log('Error in deleting the product')
      }
    })
  }
};
