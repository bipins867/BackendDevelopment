const form=document.getElementById('expense-form')
const inputAmount=document.getElementById('amount')
const inputDescription=document.getElementById('description')
const inputCategory=document.getElementById('category')
const list=document.getElementById('expense-list')

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
        
 
        axios.get(`http://localhost:3000/Expense/getDeleteExpense/${obj.id}`)
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
    
    axios.post('http://localhost:3000/Expense/postAddExpense/',obj)
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

    const result=await axios.get('http://localhost:3000/Expense/getExpenses')
    
    for (const product of result.data){
        addItem(product)
    }
}
getProducts();