

const form=document.getElementById('expense-form')
const inputAmount=document.getElementById('amount')
const inputDescription=document.getElementById('description')
const inputCategory=document.getElementById('category')
const list=document.getElementById('expense-list')
const buttonPremium=document.getElementById('premium-button')


function addItem(obj){
    var data=`Amount :- ${obj.amount}||
         Description:- ${obj.description}||
         Category :- ${obj.category}`

    

    const li=document.createElement('li')
    
    const text=document.createTextNode(data)

    const deleteButton=document.createElement('button')
    

    deleteButton.textContent='Delete'

    li.appendChild(text)
    li.appendChild(deleteButton)


    list.appendChild(li);


    deleteButton.addEventListener('click',event=>{
        const token=localStorage.getItem('token')

        if(token==null)
        window.location.href='../Login/index.html'

        const headers={authorization:token}
        
        axios.get(`http://localhost:3000/Expense/getDeleteExpense/${obj.id}`,{headers})
        .then(result=>{
            console.log(result)
            list.removeChild(li)
        })
        .catch(err=>{
            console.log(err)
        })
        
    })

    
    
}

const addFunction=event=>{
    event.preventDefault();
    obj={
        amount:inputAmount.value,
        description:inputDescription.value,
        category:inputCategory.value
    }

    const token=localStorage.getItem('token')

    if(token==null)
    window.location.href='../Login/index.html'

    
    axios.post('http://localhost:3000/Expense/postAddExpense/',obj,{headers:{Authorization:token}})
    .then(result=>{
       
        addItem(result.data)
        inputAmount.value=''
        inputDescription.value=''
        inputCategory.value=''
        
    })
    .catch(err=>console.log(err))

    
}

form.onsubmit=addFunction
async function getProducts(){
    const token=localStorage.getItem('token')

    if(token==null)
    window.location.href='../Login/index.html'
    const headers={authorization:token}
    const result=await axios.get('http://localhost:3000/Expense/getExpenses',{headers})
    
    if(result.data.isPremium)
        buttonPremium.style.display = 'none';

    for (const product of result.data.expense){
        addItem(product)
    }
}
getProducts();


buttonPremium.onclick=async event=>{
    const token=localStorage.getItem('token')

    if(token==null)
    window.location.href='../Login/index.html'
    const headers={authorization:token}
    const result=await axios.get('http://localhost:3000/Purchase/createOrder',{headers})

    const option={
        key:result.data.keyId,
        order_id:result.data.order.id,
        handler:async response=>{
            
            const opt={orderId:response.razorpay_order_id}
            
            axios.post('http://localhost:3000/Purchase/updateTransactionStatus',opt,{headers})
            .then(res=>{
                
                if(res.status==201 || res.status==200)
                {
                    buttonPremium.style.display = 'none';
                    alert("Transaction Successfulll")
                }
                else{
                    console.log(res)
                }
                    
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    const rzp=new Razorpay(option)
    rzp.open();

    rzp.on('payment.failed',(err)=>{
        const opt={orderId:response.razorpay_order_id}
            
        axios.post('http://localhost:3000/Purchase/updateTransactionStatus',opt,{headers})
        .then(res=>{
            alert("Transaction Failed")
        })
        .catch(err=>{
            console.log(err)
        })
    })

}