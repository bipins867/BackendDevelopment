const Razorpay=require('razorpay')
const User=require('../Models/User')


exports.getCreateOrder=(req,res,next)=>{
   
    try{
    
        if(req.user.isPremium)
        return res.status(202).json({status:"Already a premimum member"})
        var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_ID })


        instance.orders.create({
            amount: 50000,
            currency: "INR",
        },(err,order)=>{
            if(err){
                throw new Error("Something went wrong")
            }
            req.user.createOrder({orderId:order.id,status:'Pending'})
            .then(result=>{
                res.json({order,key_id:instance.key_id})
            })
            .catch(err=>{
                throw new Error(err)
            })
        })
    }
    catch(err)
    {
        res.status(502).json({error:err})
    }

}
async function updateTransaction(orderId,paymentId,status,user,res){
    
    if(status==true){

        Promise.all([User.update({isPremium:true},{where:{id:user.id}}),
            user.getOrders({where:{orderId:orderId,userId:user.id}})])
        .then(([res1,order])=>{
                
                order[0].update({paymentId:paymentId,status:'Successfull'})
                .then(result=>{
                    res.status(201).json({status:"Transaction Updated!"})
                })
                .catch(err=>{
                    console.log(err)
                })
                
                
        })
        .catch(err=>{

            if(err){
                res.status(502).json({error:"Something went wrong"})
            }
        })

    }
    else{
    
        
        user.getOrders({where:{orderId:orderId,userId:user.id}})
        .then(order=>{
                order[0].update({paymentId:paymentId,status:'Failed'})
                res.status(201).json({status:"Transaction Updated!"})
        })
        .catch(err=>{

            if(err){
                res.status(502).json({error:"Something went wrong"})
            }
        })
    }
}

exports.updateTransactionStatus=(req,res,next)=>{
    try{
        const orderId=req.body.orderId;
        
        var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_ID })

        instance.orders.fetchPayments(orderId,(err,response)=>{
            if(err || response.count==0){
                return updateTransaction(orderId,'',false,req.user,res)
                //return res.status(502).json({error:"Something Went Wrong"})
            }
            
            const paymentId=response.items[0].id
            
            updateTransaction(orderId,paymentId,true,req.user,res)
            //console.log(paymentId)
            //res.json({id:1})
        })
    }
    catch(err)
    {
        res.status(502).json({error:err})
    }
}