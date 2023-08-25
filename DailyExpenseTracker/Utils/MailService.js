require('dotenv').config()
const Sib=require('sib-api-v3-sdk')


const client=Sib.ApiClient.instance
const apiKey=client.authentications['api-key']
apiKey.apiKey=process.env.API_KEY

console.log(process.env.API_KEY)

const tranEmailApi=new Sib.TransactionalEmailsApi()
const sender={
    email:'bipinsingh911867@gmail.com'
}

exports.sendMail=async (reciverEmail,subject,textContent)=>{
    const reciver=[
        {
            email:reciverEmail
        }
    ]

    try{
        const result=await tranEmailApi.sendTransacEmail({
            sender,
            to:reciver,
            subject:subject,
            textContent:textContent,      
        })
        return true;
    }
    catch(err){

        return false;
    }   
}


exports.generateOtp=(min,max)=>{
    const data=Math.random()*(max-min)+min
    return parseInt(data)
}


