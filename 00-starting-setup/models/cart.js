const fs = require('fs');
const path = require('path');


var cartPath=path.join(__dirname,'../','data','cart.json')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);


module.exports=class Cart{

    static addProduct(id,product){
        //var cartData=JSON.stringify({products:[],totalAmount:0})
        //{id:2134,qty:2}
        //fs.writeFileSync(cartPath,cartData);

        //var cartData=JSON.parse(fs.readFileSync(cartPath,'utf-8'));
       
        fs.readFile(cartPath,'utf-8',(err,cartContent)=>{
            let cartData={products:[],totalAmount:0}
            if(!err){
                cartData=JSON.parse(cartContent);

                var flag=false;
                cartData.products.map(prod=>{
                    if (prod.id==id){
                        flag=true;
                        prod.qty=prod.qty+1;
                        cartData.totalAmount=parseInt(cartData.totalAmount)+parseInt(product.price);
                    }
                })
                if(!flag){
                    cartData.products.push({id:id,qty:1})
                    cartData.totalAmount=parseInt(cartData.totalAmount) +parseInt(product.price);
                }

                fs.writeFileSync(cartPath,JSON.stringify(cartData));
            }

        })

    }


}