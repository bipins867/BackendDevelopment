
const db=require('../util/database')
const cart=require('./cart')

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.id=null;
  }

  save() {
    return db.execute('insert into products(title,imageUrl,description,price) values(?,?,?,?)',
    [this.title,this.imageUrl,this.description,this.price])
  }

  static saveAll(data){
    
    
  }

  static fetchAll(cb) {
    return db.execute('select * from products');
  }
  updateProduct(){
    return db.execute('update products set title=?, imageUrl=?,description=?,price=? where id=?',
    [this.title,this.imageUrl,this.description,this.price,this.id])
  }
  static findById(id){
   
    return db.execute('select * from products where id = ?',[id])
  }

  static deleteById(id){
    
    return db.execute('delete from products where id= ?',[id])

  }
};
