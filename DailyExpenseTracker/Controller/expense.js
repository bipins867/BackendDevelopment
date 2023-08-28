const Expense=require('../Models/Expense')
const SumExpense=require('../Models/SumExpense')
const sequelize=require('../database')
const AWS=require('aws-sdk')

function upload2S3(data,fileName,cb){

    const BUCKET_NAME=process.env.AWS_BUCKET_NAME;
    const IAM_USER_KEY=process.env.IAM_USER_KEY;
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET;

    let s3bucket=new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET,
       //Bucket:BUCKET_NAME
    })

   
    var params={
        Bucket:BUCKET_NAME,
        Key:fileName,
        Body:data,
        ACL:'public-read'
    }

    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,response)=>{
            if(err){
                reject(err)
            }
            else
            {
                
               resolve(response)
            }
        })
    })

    

}

exports.postAddExpense=async (req,res,next)=>{
    const transaction=await sequelize.transaction();
    try{
        
        
        const transaction=await sequelize.transaction()

        const obj={amount:req.body.amount,description:req.body.description,category:req.body.category,userId:req.user.id}

        const result1=await req.user.createExpense(obj,{transaction:transaction})
        const result2=await req.user.getSumexpense({transaction:transaction})
        
        const amount=parseFloat(result2.sum)+parseFloat(obj.amount);
        
        await result2.update({sum:amount},{transaction:transaction})
        res.json(result1.dataValues)
        await transaction.commit();
    }
    catch(err)
    {   
        await transaction.rollback();
        res.status(500).json({error:"Something went wrong"})
    }
}


exports.getExpenses= async (req,res,next)=>{
    const oldFiles=await getOldFiles(req.user);
    req.user.getExpenses({where:{userId:req.user.id}})
    .then(async expense=>{

        const totalExpense=await SumExpense.findOne({where:{UserId:req.user.id}})
        const data={expense,oldFiles,isPremium:req.user.isPremium,totalExpense}
        res.json(data)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.getExpenseByPage=async(req,res,next)=>{
    const page=parseInt(req.params.page);
    
    
    const pageLimit=parseInt(req.headers.pagelimit);
    try{
        const count=await req.user.countExpenses({where:{UserId:req.user.id}})
        //console.log(count)
        const data=await Expense.findAll({
            offset:(page-1)*pageLimit,
            limit:pageLimit,
            where:{UserId:req.user.id}
        })
        //console.log(data)
        res.json({data,count,page})

    }
    catch(err){
        console.log(err)
        res.status(500).json({err:"Something went wrong"})
    }
    
}

exports.getDeleteExpense=async(req,res,next)=>{
    const transaction=await sequelize.transaction();
    try{
        
            
        const id=req.params.id;
        const expenseResult=await Expense.findOne({where:{id:id,userId:req.user.id},transaction:transaction})
        const sumexpenseResult=await SumExpense.findOne({where:{userId:req.user.id},transaction:transaction})
            
        const amount=parseFloat(sumexpenseResult.sum)-parseFloat(expenseResult.amount)
        
        await sumexpenseResult.update({sum:amount},{transaction:transaction})

        await expenseResult.destroy({transaction:transaction});

        res.json({status:"Transaction Deleted Successfully"})
        await transaction.commit()

    }
    catch(err){
        res.status(500).json({error:"Something went wrong"})
        await transaction.rollback()
    }
}

exports.getDownloadExpense=async(req,res,next)=>{
    try{
        
            
        const expense=await req.user.getExpenses();
    
        const stringfiyData=JSON.stringify(expense)
        const userId=req.user.id;

        const fileName=`Expense${userId}/${new Date()}.txt`
        const response=await upload2S3(stringfiyData,fileName)
        
        await req.user.createFiledownload({fileUrl:response.Location})

        res.json({fileUrl:response.Location,status:true})
    }catch(err)
    {
        console.log(err)
        res.status(500).json({fileUrl:'',status:false})
    }
}


async function getOldFiles(user){
    const data=await user.getFiledownloads();
    return data
}