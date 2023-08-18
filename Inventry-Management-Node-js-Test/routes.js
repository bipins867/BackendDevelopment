const ShopInventory=require('./models')


exports.postAddProduct=(req,res,next)=>{
    const data=req.body;
    ShopInventory.create({
        name:data.name,
        description:data.description,
        price:data.price,
        quantity:data.quantity
    })
    .then(result=>{
        res.json(result)
    })
    .catch(err=>console.log(err))
}

exports.getProducts=(req,res,next)=>[
    ShopInventory.findAll()
    .then(products=>{
        res.json(products)
    })
    .catch(err=>console.log(err))
]

exports.postEditProduct=(req,res,next)=>{
    const productId=req.params.id;
    const body=req.body;
    const obj={name:body.name,description:body.description,price:body.price,quantity:body.quantity}

    ShopInventory.update(obj,{
        where:{id:productId}
    })
    .then(result=>{
        return ShopInventory.findByPk(productId)
     })
     .then(product=>{
        res.json(product)
     })
    .catch(err=>{
        console.log(err)
    })
}

exports.postBuyProduct=(req,res,next)=>{
    const productId=req.params.id;
    const body=req.body;
    const obj={quantity:body.quantity}
    ShopInventory.findByPk(productId)
    .then(product=>{
        
        if(product.quantity>=obj.quantity){
            obj.quantity=product.quantity-obj.quantity;
            return ShopInventory.update(obj,{
                where:{id:productId}
            })
        }
        else
        {
            
           return Promise.reject({error:"Out of Stock"})
        }
    }) 
    .then(result=>{
            
          
             return ShopInventory.findByPk(productId)
     })
     .then(product=>{
        
        
        res.json(product)
     })
    .catch(err=>{
        
        res.status(302).json(err)
    })

    
}